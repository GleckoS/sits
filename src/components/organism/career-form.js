import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { default as React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { default as styled } from 'styled-components';
import * as yup from 'yup';
import { textTransition } from '../../helpers/animation-controller';
import { formErrorActions, formErrorHeading, formErrorText, formSuccessActions, formSuccessHeading, formSuccessText, privacyPolicy, submit, title } from '../../texts/career';
import { email, errorMessage, name, phone, reply, thans } from '../../texts/contact';
import CitySelector from '../moleculas/city-selector';
import FileUpload from '../moleculas/file-uploads';
import { Label } from '../moleculas/label';

export default function CareerForm({ data: { language, selectedCity, jobTitle = null, receiverEmail, citiesAvailable, onFormSubmit }, ...props }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      files: [],
      city: selectedCity || citiesAvailable[0].city,
    },
    resolver: yupResolver(
      yup.object().shape({
        fullname: yup.string().required('To pole jest wymagane'),
        email: yup.string().email('Niepoprawny email').required('To pole jest wymagane'),
        phone: yup
          .string()
          .matches(/^[+]?[\d\s-]{9,}$/, 'Niepoprawny format numeru telefonu')
          .transform((value) => (value ? value : null))
          .nullable(),
        city: yup.string().required('Wybór miasta jest wymagany'),

        files: yup.array().min(1, 'Załączenie pliku CV jest wymagane').max(5, 'Maksymalnie możesz załączyć 5 plików').required('Załączenie pliku CV jest wymagane'),
        check: yup.boolean().oneOf([true], 'Musisz zaakceptować politykę prywatności'),
      })
    ),
  });
  const [currentCity, setCurrentCity] = useState(selectedCity || citiesAvailable[0].city);
  const [isSended, setIsSended] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState([]);

  const isFormDisabled = isSending || isSended;

  const onSubmit = async (data) => {
    setIsSending(true);

    try {
      // Convert files to base64 strings
      const filePromises = files.map((file) => {
        console.log(file);
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            // Convert binary string to base64
            const binaryStr = reader.result;
            const base64String = btoa(new Uint8Array(binaryStr).reduce((data, byte) => data + String.fromCharCode(byte), ''));

            resolve({
              fileName: file.name,
              type: file.type,
              data: base64String,
              mimeType: file.type,
            });
          };
          reader.onerror = (error) => reject(error);
          // Read as array buffer instead of data URL
          reader.readAsArrayBuffer(file);
        });
      });

      const base64Files = await Promise.all(filePromises);

      // Prepare payload for Make.com
      const payload = {
        formData: {
          fullname: data.fullname,
          email: data.email,
          phone: data.phone || 'Not provided',
          city: data.city,
          receiverEmail: receiverEmail || citiesAvailable.find((city) => city.city === data.city).email,
          jobTitle,
        },
        files: base64Files,
        language: language,
      };

      console.log(payload);

      const response = await fetch('https://hook.eu1.make.com/1luddokas9lst12vhma2895bdvfihipy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setIsSended(true);
      setIsSuccess(true);
      onFormSubmit?.();
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSended(true);
      setIsSuccess(false);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = (newFiles) => {
    // Check total number of files that would be added
    const totalFiles = files.length + newFiles.length;

    if (totalFiles > 5) {
      // If we already have files, show how many more can be added
      if (files.length > 0) {
        const remainingSlots = 5 - files.length;
        toast.error(`Możesz dodać jeszcze tylko ${remainingSlots} ${remainingSlots === 1 ? 'plik' : 'pliki'}`);
      } else {
        toast.error('Maksymalnie możesz załączyć 5 plików');
      }
      return;
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    setValue('files', updatedFiles, {
      shouldValidate: true,
    });

    // Add success toast with appropriate message based on number of files added
    if (newFiles.length === 1) {
      toast.success('Plik został dodany pomyślnie');
    } else {
      toast.success(`${newFiles.length} pliki zostały dodane pomyślnie`);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);

    setFiles((prev) => prev.filter((_, i) => i !== index));

    setValue('files', updatedFiles, {
      shouldValidate: true,
    });
  };

  const titleAnimation = textTransition(1);

  const formAnimation = {
    initial: { opacity: 1 },
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
  };

  const inputAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
  };

  const handleCityChange = (city) => {
    setCurrentCity(city);
    setValue('city', city, { shouldValidate: true });
  };

  const handleReset = () => {
    setIsSended(false);
    setIsSuccess(false);
    setIsSending(false);
    setFiles([]);
    reset({
      files: [],
      city: selectedCity || citiesAvailable[0].city,
      fullname: '',
      email: '',
      phone: '',
      check: false,
    });
  };

  return isSended ? (
    <AnimatePresence mode="wait">
      {isSended && (
        <Result initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={isSended ? 'sended' : ''} $success={isSuccess}>
          {isSuccess ? <SuccesIcon /> : <FailureIcon />}
          <span className="title" $success={isSuccess}>
            {isSuccess ? formSuccessHeading[language] : formErrorHeading[language]}
          </span>
          <span className="text">{isSuccess ? formSuccessText[selectedCity ? 'specificOffer' : 'noOffer'][language] : formErrorText[language]}</span>
          {isSuccess ? (
            <div className="action">
              <div className="socials">
                <a className="path" aria-label="facebook" href="https://www.facebook.com/sitseu" target="_blank" rel="noreferrer noopener me">
                  <svg xmlns="http://www.w3.org/2000/svg" width="43.21" height="43.21" viewBox="0 0 43.21 43.21">
                    <path id="SoMe_Icons_Transp_SoMe_Facebook_Trans" d="M25.805,4.52A21.605,21.605,0,1,0,47.41,26.125,21.607,21.607,0,0,0,25.805,4.52ZM31.964,22.3l-.479,4.175c0,.052-.012.1-.02.153a2.342,2.342,0,0,0-.032.294H27.241V39.6H22.12V26.934H18.025V21.817h4.083V20.5c0-.628-.008-1.167.012-1.9a6.188,6.188,0,0,1,1.167-3.661,5.416,5.416,0,0,1,3.029-2.007,7.559,7.559,0,0,1,2-.257h.209c1.058,0,2.152.052,3.347.165H31.9v4.015H30.564c-.35,0-.7,0-1.054,0a4.944,4.944,0,0,0-.889.084,1.49,1.49,0,0,0-1.352,1.521c-.032.555-.036,1.122-.036,1.669v1.677H32.02l-.052.507Z" transform="translate(-4.2 -4.52)" fill="#c4c4c4" />
                  </svg>
                </a>
                <a className="rect" aria-label="instagram" href="https://www.instagram.com/sits_furniture/" target="_blank" rel="noreferrer noopener me">
                  <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.900391" y="0.900391" width="43.2" height="43.2" rx="21.6" fill="#C4C4C4" />
                    <path
                      d="M22.4982 19.127C20.5112 19.127 18.8896 20.6428 18.8896 22.5003C18.8896 24.3577 20.5112 25.8735 22.4982 25.8735C24.4852 25.8735 26.1068 24.3577 26.1068 22.5003C26.1068 20.6428 24.4852 19.127 22.4982 19.127ZM33.3213 22.5003C33.3213 21.1034 33.3349 19.7191 33.2509 18.3248C33.167 16.7052 32.7718 15.2679 31.5048 14.0835C30.2352 12.8967 28.7003 12.5298 26.9677 12.4513C25.4733 12.3729 23.9925 12.3855 22.5009 12.3855C21.0066 12.3855 19.5258 12.3729 18.0341 12.4513C16.3016 12.5298 14.7639 12.8992 13.497 14.0835C12.2273 15.2704 11.8348 16.7052 11.7509 18.3248C11.667 19.7217 11.6805 21.1059 11.6805 22.5003C11.6805 23.8946 11.667 25.2814 11.7509 26.6757C11.8348 28.2953 12.23 29.7327 13.497 30.917C14.7666 32.1038 16.3016 32.4708 18.0341 32.5492C19.5285 32.6277 21.0093 32.615 22.5009 32.615C23.9953 32.615 25.4761 32.6277 26.9677 32.5492C28.7003 32.4708 30.2379 32.1013 31.5048 30.917C32.7745 29.7301 33.167 28.2953 33.2509 26.6757C33.3376 25.2814 33.3213 23.8971 33.3213 22.5003ZM22.4982 27.6905C19.4256 27.6905 16.9459 25.3725 16.9459 22.5003C16.9459 19.628 19.4256 17.31 22.4982 17.31C25.5708 17.31 28.0505 19.628 28.0505 22.5003C28.0505 25.3725 25.5708 27.6905 22.4982 27.6905ZM28.2779 18.3096C27.5605 18.3096 26.9812 17.7681 26.9812 17.0975C26.9812 16.4269 27.5605 15.8853 28.2779 15.8853C28.9953 15.8853 29.5747 16.4269 29.5747 17.0975C29.5749 17.2567 29.5415 17.4144 29.4764 17.5616C29.4113 17.7087 29.3158 17.8424 29.1953 17.955C29.0749 18.0676 28.9318 18.1569 28.7744 18.2178C28.617 18.2786 28.4483 18.3098 28.2779 18.3096Z"
                      fill="#F8F5F0"
                    />
                  </svg>
                </a>
                <a className="path" aria-label="youtube" href="https://www.youtube.com/@sits_furniture" target="_blank" rel="noreferrer noopener me">
                  <svg id="SoMe_Icons_Transp_SoMe_YouTube_Trans" xmlns="http://www.w3.org/2000/svg" width="43.21" height="43.21" viewBox="0 0 43.21 43.21">
                    <path id="Path_36" data-name="Path 36" d="M51.99,56.443c2.124-1.227,4.216-2.434,6.364-3.677-2.148-1.239-4.24-2.45-6.364-3.677v7.349Z" transform="translate(-32.819 -31.161)" fill="#c4c4c4" />
                    <path id="Path_37" data-name="Path 37" d="M25.935,4.52A21.605,21.605,0,1,0,47.54,26.125,21.607,21.607,0,0,0,25.935,4.52ZM37.991,29.154a23.873,23.873,0,0,1-.334,2.562,2.962,2.962,0,0,1-2.675,2.51c-1.138.145-2.285.245-3.431.294-1.87.08-3.741.109-4.96.141-3.117-.028-5.579-.06-8.033-.241a15.912,15.912,0,0,1-1.85-.225,2.967,2.967,0,0,1-2.494-2.43,19.537,19.537,0,0,1-.382-3.21,38.035,38.035,0,0,1,.044-5.459,23.131,23.131,0,0,1,.3-2.414A3.027,3.027,0,0,1,17.073,18c1.508-.153,3.021-.249,4.537-.314q4.32-.181,8.64,0c1.412.056,2.824.161,4.236.265a3.96,3.96,0,0,1,1.525.378,3.035,3.035,0,0,1,1.645,2.144,20.97,20.97,0,0,1,.386,3.246,37.185,37.185,0,0,1-.048,5.439Z" transform="translate(-4.33 -4.52)" fill="#c4c4c4" />
                  </svg>
                </a>
              </div>
              <p>{formSuccessActions[language]}</p>
            </div>
          ) : (
            <button type="button" className="try-again" onClick={handleReset}>
              {formErrorActions[language]}
            </button>
          )}
        </Result>
      )}
    </AnimatePresence>
  ) : (
    <Wrapper className="form" {...props}>
      <motion.h2 variants={titleAnimation}>{title[language]}</motion.h2>
      <motion.form autocomplete="off" variants={formAnimation} onSubmit={handleSubmit(onSubmit)}>
        {!selectedCity && <CitySelector disabled={isFormDisabled} language={language} className="city-selector" setCurrentCity={handleCityChange} showAll={false} currentCity={currentCity} citiesAvailable={citiesAvailable.map((city) => city.city)} isRequired={true} error={errors?.city?.message} />}
        <input type="hidden" {...register('city')} />
        <Label language={language} variants={inputAnimation} register={register} required={true} errors={errors} name="fullname" obj={name} disabled={isFormDisabled} tabIndex={isFormDisabled ? -1 : 0} />
        <Label language={language} variants={inputAnimation} register={register} required={true} errors={errors} name="email" obj={email} disabled={isFormDisabled} tabIndex={isFormDisabled ? -1 : 0} />
        <Label language={language} variants={inputAnimation} register={register} required={false} errors={errors} name="phone" obj={phone} disabled={isFormDisabled} tabIndex={isFormDisabled ? -1 : 0} />
        <FileUpload files={files} language={language} onFileChange={handleFileChange} onRemove={removeFile} variants={inputAnimation} errors={errors?.files} disabled={isFormDisabled} />
        <Checkbox variants={inputAnimation} disabled={isFormDisabled}>
          <input tabIndex={isFormDisabled ? -1 : 0} disabled={isFormDisabled} {...register('check', { required: true })} type="checkbox" />
          <div className="check" />
          <span dangerouslySetInnerHTML={{ __html: privacyPolicy[language] }} />
          <AnimatePresence mode="wait">
            {errors['check'] && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="erorr-span">
                {errorMessage[language]}
              </motion.span>
            )}
          </AnimatePresence>
        </Checkbox>
        <Submit tabIndex={isFormDisabled ? -1 : 0} disabled={isFormDisabled} variants={inputAnimation}>
          {submit[language]}
        </Submit>
        <LoadingSpinner isLoading={isSending}>
          <div />
        </LoadingSpinner>
      </motion.form>
    </Wrapper>
  );
}

const Checkbox = styled(motion.label)`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  position: relative;

  input {
    width: 30px;
    height: 30px;
    position: absolute;
    user-select: none;
    opacity: 0;
  }

  input:focus ~ .check {
    outline: 2px solid var(--color-brown);
  }

  input:checked ~ .check {
    &::after {
      transform: translate(-50%, -50%) scale(1);
    }

    &::before {
      opacity: 1;
    }
  }

  .check {
    width: 30px;
    height: 30px;
    border: 2px solid #767676;
    border-radius: 3px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      color: #767676;
      font-size: 40px;
      width: 16px;
      height: 16px;
      background-color: #767676;
      border-radius: 2px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      transform-origin: 50% 50%;
      transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);
    }
  }

  span {
    font-weight: 400;
    font-size: clamp(16px, ${(20 / 1194) * 100}vw, 20px);
    line-height: 150%;
    font-feature-settings: 'pnum' on, 'onum' on, 'ss01' on, 'ss02' on, 'ss03' on, 'ss04' on;
    color: #767676;

    a {
      display: inline-block;
      color: #767676;
      background-image: linear-gradient(#767676, #767676);

      width: fit-content;
      position: relative;
      padding-bottom: 3px;
      text-decoration: unset !important;

      transition: background-size 0.5s cubic-bezier(0.76, 0, 0.24, 1);

      background-size: 80% 1px;
      background-position: left bottom;
      background-repeat: no-repeat;

      &:hover {
        background-size: 100% 1px !important;
      }
    }
  }
`;

const Result = styled(motion.div)`
  padding: 48px 0px;
  max-width: 519px;
  background-color: #fff;
  opacity: 1;
  pointer-events: all;
  transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  text-align: start;

  & > svg {
    margin-bottom: clamp(16px, calc(32vw / 7.68), 32px);
  }

  .title {
    margin-bottom: clamp(16px, calc(32vw / 7.68), 32px);
    font-size: clamp(calc(20rem / 16), calc(26vw / 7.68), calc(26rem / 16));
    line-height: 1.5;
    font-weight: 400;
    color: ${({ $success }) => ($success ? '#4F7855' : '#A32D2D')};
  }

  .text {
    font-size: calc(16rem / 16);
    line-height: 1.5;
  }

  .action {
    margin-top: clamp(48px, calc(64vw / 7.68), 64px);
    display: flex;
    align-items: center;
    gap: 20px 24px;
    flex-wrap: wrap;

    .socials {
      display: flex;
      justify-content: flex-end;
      gap: 8px;

      a {
        width: 43.2px;
        height: 43.2px;
        border-radius: 50%;
      }

      svg path,
      svg rect {
        transition: fill 0.4s cubic-bezier(0.42, 0, 0.58, 1);
      }
      .path:hover {
        svg path {
          fill: var(--color-brown);
        }
      }

      .rect:hover {
        svg {
          rect {
            fill: var(--color-brown);
          }
        }
      }
    }

    p {
      max-width: calc(267rem / 16);
    }
  }

  .try-again {
    margin-top: 32px;
    background-color: #886b4b;
    color: #f8f5f0;
    font-size: clamp(calc(18rem / 16), calc(20vw / 7.68), calc(20rem / 16));
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    width: 100%;
    transition: background-color 0.3s ease-in-out;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #88643d;
    }

    &:focus {
      background-color: #785836;
    }
  }
`;

const Wrapper = styled.div`
  .erorr-span {
    font-size: 14px;
    color: #a32d2d;
    position: absolute;
    right: 0;
    top: 0;
    text-align: right;
    transform: translateY(-100%);
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  h2 {
    font-size: clamp(calc(20rem / 16), calc(24vw / 7.68), calc(24rem / 16));
    font-weight: 400;
    margin-bottom: clamp(36px, calc(48vw / 7.68), 48px);
    text-transform: uppercase;
  }

  div.city-selector {
    flex-direction: column;
    align-items: flex-start;
  }

  form {
    position: relative;
    display: grid;
    grid-gap: 48px;

    @media (max-width: 820px) {
      grid-template-columns: 1fr;
      grid-template-areas: unset;

      * {
        grid-area: unset;
      }
    }
  }

  div.file-load {
    background-color: #ededed;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 260px;
  }
`;

const Submit = styled(motion.button)`
  width: fit-content;
  padding: 17px;
  width: 100%;
  background-color: var(--color-brown);
  margin-top: -24px;

  font-size: clamp(14px, ${(18 / 1024) * 100}vw, 18px);
  text-transform: uppercase;
  color: #fff;
  border: none;
  display: block;
  cursor: pointer;
  transition: background-color 0.4s cubic-bezier(0.42, 0, 0.58, 1);

  &:hover {
    background-color: #785836;
  }

  &:active {
    background-color: #785836;
  }

  &:focus-visible {
    outline: 1px solid #88643d;
    outline-offset: 2px;
  }

  &:disabled {
    background: #cfcfcf;
  }
`;

const LoadingSpinner = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: grid;
  place-items: center;
  animation: fadeIn 0.2s ease-in-out;
  display: ${({ isLoading }) => (isLoading ? 'grid' : 'none')};

  div {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: relative;
    animation: rotate 0.7s linear infinite;

    &::before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: 4px solid var(--color-brown);
      animation: prixClipFix 2s linear infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes prixClipFix {
      0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
      }
      25% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
      }
      50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
      }
      75% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
      }
      100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SuccesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={37} height={36} fill="none">
    <path stroke="#4F7855" strokeLinecap="round" strokeWidth={2} d="M33.5 19.5v-9A4.5 4.5 0 0 0 29 6H8a4.5 4.5 0 0 0-4.5 4.5v15A4.5 4.5 0 0 0 8 30h9M5.75 8.378l11.261 9.937c.85.75 2.127.75 2.978 0L31.25 8.378M23 29.455l2.881 3.255a.806.806 0 0 0 1.238 0L33.5 25.5" />
  </svg>
);

const FailureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={37} height={36} fill="none">
    <path stroke="#A32D2D" strokeLinecap="round" strokeWidth={2} d="M33.5 18.75V10.5A4.5 4.5 0 0 0 29 6H8a4.5 4.5 0 0 0-4.5 4.5v15A4.5 4.5 0 0 0 8 30h11.25M5.75 8.378l11.261 9.937c.85.75 2.127.75 2.978 0L31.25 8.378m-6.443 15.93 3.6 3.6m0 0 3.602 3.6m-3.601-3.6 3.6-3.6m-3.6 3.6-3.6 3.6" />
  </svg>
);

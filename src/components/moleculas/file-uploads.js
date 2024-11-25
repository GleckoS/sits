import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import { addMoreFiles, attachCV, chooseFile, dragItHere, dropFileHere, format, maxFileSize, or, uploaded } from '../../texts/career';
import { toast } from 'react-toastify';
import { toastMessages } from '../../texts/career';

const ACCEPTED_TYPES = {
  '.pdf': 'application/pdf',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
const MAX_FILES = 3;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default function FileUpload({ files, onFileChange, onRemove, disabled, language, variants, errors }) {
  const [uploadProgress, setUploadProgress] = useState({});
  const [fileIds, setFileIds] = useState({});
  const [isDragOver, setIsDragOver] = useState(false);
  console.log(errors);

  const generateUniqueId = (file) => {
    // Add a random component to ensure uniqueness even for identical files
    const random = Math.random().toString(36).substring(2, 15);
    return `${file.name}-${file.size}-${Date.now()}-${random}`;
  };

  const processFiles = (newFiles) => {
    if (files.length === MAX_FILES) {
      toast.error(toastMessages.maxFilesLimitReached[language]);
      return;
    }

    if (files.length + newFiles.length > MAX_FILES) {
      if (files.length > 0) {
        const remainingSlots = MAX_FILES - files.length;
        toast.error(remainingSlots === 1 ? toastMessages.remainingFiles.singular[language] : toastMessages.remainingFiles.plural[language].replace('{count}', remainingSlots));
      } else {
        toast.error(toastMessages.maxFilesLimitReached[language]);
      }
      return;
    }

    const validFiles = Array.from(newFiles).filter((file) => {
      const isValidType = Object.values(ACCEPTED_TYPES).includes(file.type);
      const isValidSize = file.size <= MAX_SIZE;
      return isValidType && isValidSize;
    });

    if (validFiles.length) {
      // Create new file objects while preserving ALL original file properties
      const processedFiles = validFiles.map((file) => {
        // Create a new File object with all original properties
        const processedFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });

        // Add our unique ID
        Object.defineProperty(processedFile, 'id', {
          value: generateUniqueId(file),
          writable: false,
        });

        return processedFile;
      });

      // Update fileIds state
      const newFileIds = {};
      processedFiles.forEach((file) => {
        newFileIds[file.id] = file.id;
      });

      setFileIds((prev) => ({
        ...prev,
        ...newFileIds,
      }));

      // Pass the processed files to parent
      onFileChange(processedFiles);

      // Start progress for each file
      processedFiles.forEach((file) => {
        let progress = 0;
        const interval = setInterval(
          () => {
            // Faster progress below 50%, slower above
            const increment = progress < 50 ? 15 : 5; // 15% steps below 50%, 5% steps above
            progress += increment;

            setUploadProgress((prev) => ({
              ...prev,
              [file.id]: Math.min(progress, 100),
            }));

            if (progress >= 100) {
              clearInterval(interval);
            }
          },
          progress < 50 ? 40 : 80
        ); // 40ms intervals below 50%, 80ms above
      });

      // Success toast with appropriate message
      if (validFiles.length === 1) {
        toast.success(toastMessages.fileSuccess.singular[language]);
      } else {
        toast.success(toastMessages.fileSuccess.plural[language].replace('{count}', validFiles.length));
      }
    }
  };

  const handleFileInput = (event) => {
    processFiles(event.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  // Add keyboard handler for the initial upload label
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      document.getElementById('file-input').click();
    }
  };

  // Add keyboard handler for "Add more files" label
  const handleAddMoreKeyDown = (e) => {
    if (e.key === 'Enter') {
      document.getElementById('add-more-files').click();
    }
  };

  return (
    <Wrapper>
      <p className="title">{attachCV[language]}</p>
      <ul className="info">
        <li>
          {format[language]}: <span>PDF</span> <span>JPEG</span> <span>PNG</span> <span>DOCX</span>
        </li>
        <li>{maxFileSize[language]}</li>
        <li>Maksymalnie 3 pliki</li>
      </ul>
      <div className="error-container">
        <AnimatePresence mode="wait">
          {errors && (
            <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="error-svg" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0312 16H12.0413M12.0312 8V12M7.89125 2H16.1712L22.0312 7.86V16.14L16.1712 22H7.89125L2.03125 16.14V7.86L7.89125 2Z" stroke="#A32D2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {errors && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="erorr-text">
              {errors.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {files.length > 0 ? (
        <FileUploadWrapper variants={variants} hasFiles={files.length > 0} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} $isDragOver={isDragOver}>
          <div className="upload-area" $hasError={!!errors}>
            <DragOverlay $isDragOver={isDragOver}>
              <PlusIcon />
              <span>{dropFileHere[language]}</span>
            </DragOverlay>

            <FileList>
              {files.map((file, index) => {
                const fileId = file.id || fileIds[file.name] || `${file.name}-${index}`;
                const progress = uploadProgress[fileId] || 0;
                const isComplete = progress === 100;

                // Add safety check for file name splitting
                const [name, extension] = file?.name ? file.name.split(/\.(?=[^.]+$)/) : ['', ''];

                return (
                  <FileItem key={fileId}>
                    <div className="file-icon">{file?.type?.includes('image') ? <ImageDocIcon /> : <TextDocIcon />}</div>
                    <div className="file-progress">
                      <ProgressBar progress={progress} $isComplete={isComplete} />
                      {isComplete ? (
                        <div className="complete-status">
                          <CheckIcon />
                          <span>{uploaded[language]}</span>
                        </div>
                      ) : (
                        <span className="progress-text">{progress}%</span>
                      )}
                    </div>

                    <div className="file-name">
                      {name}
                      <span className="extension">.{extension}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onRemove(index);
                      }}
                      className="remove-button"
                      aria-label={`Usuń plik ${file?.name || ''}`}
                    >
                      <CloseIcon />
                    </button>
                  </FileItem>
                );
              })}
            </FileList>

            <div>
              <input tabIndex={disabled ? -1 : 0} disabled={disabled} type="file" multiple accept={Object.keys(ACCEPTED_TYPES).join(',')} onChange={handleFileInput} id="add-more-files" style={{ display: 'none' }} />
              <AddMoreFiles htmlFor="add-more-files" className="control-desctop underline" tabIndex={disabled ? -1 : 0} onKeyDown={handleAddMoreKeyDown}>
                {addMoreFiles[language]}
              </AddMoreFiles>
            </div>
          </div>
        </FileUploadWrapper>
      ) : (
        <label htmlFor="file-input" role="button" tabIndex={disabled ? -1 : 0}>
          <FileUploadWrapper variants={variants} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} $isDragOver={isDragOver}>
            <div className="upload-area" $hasError={!!errors}>
              <input tabIndex={disabled ? -1 : 0} disabled={disabled} type="file" multiple accept={Object.keys(ACCEPTED_TYPES).join(',')} onChange={handleFileInput} id="file-input" style={{ display: 'none' }} />
              <DragOverlay $isDragOver={isDragOver} $isAtLimit={files.length >= MAX_FILES}>
                <PlusIcon />
                <span>{dropFileHere[language]}</span>
              </DragOverlay>

              <div className="upload-content">
                <span className="upload-button">
                  <UploadIcon />
                  <span>{chooseFile[language]}</span>
                </span>
                <span>{or[language]}</span>
                <span className="drag-text">{dragItHere[language]}</span>
              </div>
            </div>
          </FileUploadWrapper>
        </label>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 1rem;
  color: #767676;

  p.title {
    margin-bottom: 8px;
    line-height: 1.6;
    font-size: calc(20rem / 16);
    color: #767676;
  }

  ul.info {
    margin-bottom: 12px;
    margin-left: 20px;
    li {
      align-items: center;
      color: #767676;
      list-style: disc;
      color: #767676;
      line-height: 2;

      span {
        background-color: #f8f5f1;
        padding: 2px 4px 0;
        line-height: 1.55;
        color: #767676;
        display: inline-block;
      }
    }
  }

  .upload-area {
    outline: none !important;
  }

  label:focus-visible {
    .upload-area {
      outline: 2px solid #31231e !important;
      outline-offset: 2px;
    }
  }

  .error-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;

    span {
      color: #a32d2d;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const FileUploadWrapper = styled(motion.div)`
  cursor: ${(props) => (props.hasFiles ? 'default' : 'pointer')};

  .upload-area {
    border: 1.5px dashed ${(props) => (props.$isDragOver ? (props.$hasError ? '#A32D2D' : '#31231E') : '#767676')};
    padding: 28px 24px;
    text-align: center;
    position: relative;
    transition: border-color 0.2s ease;

    ${(props) =>
      props.$hasError &&
      `
        border: 1.5px dashed #A32D2D !;
      `}

    &:hover {
      border-color: #31231e;
      .upload-content {
        .drag-text {
          color: #31231e;
        }

        .upload-button {
          span {
            color: #31231e;
          }
        }
      }
    }
  }

  .upload-content {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;

    .upload-button {
      display: flex;
      align-items: center;
      gap: 8px;

      span {
        color: #767676;
        transition: color 0.2s ease;
      }
    }

    .drag-text {
      color: #767676;
      transition: color 0.2s ease;
    }

    @media (hover: none) and (pointer: coarse) {
      justify-content: center;
      & > span:nth-of-type(2),
      .drag-text {
        display: none;
      }
    }
  }
`;

const DragOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f8f5f1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: ${(props) => (props.$isDragOver && !props.$isAtLimit ? 1 : 0)};
  visibility: ${(props) => (props.$isDragOver && !props.$isAtLimit ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  z-index: 2;
  color: #31231e;
  font-size: 16px;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px 8px;
  margin-bottom: 16px;

  @media (max-width: 539px) {
    gap: 16px;
  }
`;

const FileItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;

  .file-icon {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    background-color: #f8f5f1;
    flex-shrink: 0;
    min-width: 0;
    margin-right: 12px;
  }

  .file-progress {
    display: flex;
    flex-direction: column;
    margin-right: auto;
    padding-top: 6px;
    align-items: flex-start;
    flex-shrink: 0;
    .progress-text {
      margin-top: 5px;
      font-size: calc(13rem / 16);
      letter-spacing: -0.26px;
      line-height: 1.7;
    }

    .complete-status {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 5px;
      font-size: calc(13rem / 16);
      letter-spacing: -0.26px;

      span {
        color: #4f7855;
        line-height: 1.7;
      }

      svg {
        padding-top: 2px;
      }
    }
  }

  .file-name {
    font-size: calc(13rem / 16);
    letter-spacing: -0.26px;
    line-height: 1.7;
    hyphens: auto; // Enable automatic hyphenation
    word-break: break-all; // Changed from break-word to allow breaking at any character
    text-align: end;
    min-width: 0;
    flex: 1;
    margin-left: 12px;
    .extension {
      color: #767676;
    }
  }

  .remove-button {
    background: none;
    border: none;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    margin-left: 8px;
    cursor: pointer;

    svg {
      path {
        transition: stroke 0.2s ease;
        stroke: #767676;
      }
    }

    &:hover {
      svg {
        path {
          stroke: #31231e;
        }
      }
    }
  }

  @media (max-width: 539px) {
    grid-template-columns: auto auto 1fr;
    grid-area: auto !important;

    .file-icon {
      grid-row: 1/2;
      grid-column: 1/2;
    }

    .file-progress {
      grid-row: 2/3;
      grid-column: 1/-1;
      width: 100%;
      padding-top: 10px;

      > div:first-child {
        width: 100%;
      }
    }

    .file-name {
      grid-row: 1/2;
      grid-column: 2/3;
      text-align: start;
    }

    .remove-button {
      grid-row: 1/2;
      grid-column: 3/4;
    }
  }
`;

const ProgressBar = styled.div`
  height: 2px;
  background: #e0e0e0;
  position: relative;
  width: 185px;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${(props) => props.progress}%;
    background: ${(props) => (props.$isComplete ? '#4F7855' : '#31231E')};
    transition: width 0.3s ease;
  }
`;

const AddMoreFiles = styled.label`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none">
    <path stroke="#886B4B" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.999 8v2.5m0 0V13m0-2.5h2.5m-2.5 0h-2.5m9.166-4.333v8.667c0 1.4 0 2.1-.272 2.635A2.5 2.5 0 0 1 15.3 18.56c-.534.273-1.235.273-2.635.273H7.332c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.092-1.092c-.273-.535-.273-1.235-.273-2.635V6.167c0-1.4 0-2.1.273-2.635a2.5 2.5 0 0 1 1.092-1.093c.535-.272 1.235-.272 2.635-.272h5.333c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.093 1.093c.272.535.272 1.235.272 2.635Z" />
  </svg>
);

const TextDocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none">
    <path
      fill="#886B4B"
      d="m13.116 2.425.445-.227-.445.227Zm-.874-.874.227-.446-.227.446ZM3.759 14.448l-.227.446.227-.446Zm-.874-.874-.446.227.446-.227Zm9.357.874.227.446-.227-.446Zm.874-.874.445.227-.445-.227ZM2.885 2.425l-.446-.227.446.227Zm.874-.874-.227-.446.227.446Zm1.575 2.615a.5.5 0 0 0 0 1v-1Zm0 2.667a.5.5 0 0 0 0 1v-1Zm0 2.667a.5.5 0 0 0 0 1v-1Zm4.8 4.666H5.867v1h4.267v-1Zm-6.967-2.7V4.533h-1v6.933h1Zm9.667-6.933v6.933h1V4.533h-1Zm-6.967-2.7h4.267v-1H5.867v1Zm7.967 2.7c0-.552 0-.996-.03-1.354-.029-.365-.092-.685-.243-.981l-.89.454c.066.132.112.306.137.608.025.309.026.705.026 1.273h1Zm-3.7-2.7c.568 0 .964 0 1.272.026.303.024.477.07.609.137l.454-.89c-.296-.151-.617-.214-.981-.244-.359-.03-.803-.029-1.354-.029v1Zm3.427.365a2.5 2.5 0 0 0-1.092-1.093l-.454.891a1.5 1.5 0 0 1 .655.656l.891-.454ZM5.867 14.166c-.568 0-.964 0-1.273-.025-.302-.025-.476-.071-.608-.138l-.454.89c.296.152.616.215.98.244.36.03.803.03 1.355.03v-1Zm-3.7-2.7c0 .552 0 .996.029 1.355.03.364.093.684.243.98l.891-.454c-.067-.131-.113-.305-.137-.608-.026-.308-.026-.704-.026-1.273h-1Zm1.819 2.537a1.5 1.5 0 0 1-.656-.656l-.89.454a2.5 2.5 0 0 0 1.092 1.093l.454-.891Zm6.148 1.163c.551 0 .995 0 1.354-.029.364-.03.684-.092.98-.243l-.453-.891c-.132.067-.306.113-.609.138-.308.025-.704.025-1.272.025v1Zm2.7-3.7c0 .569 0 .965-.026 1.273-.025.303-.07.477-.138.608l.891.454c.151-.296.214-.616.244-.98.029-.359.029-.803.029-1.355h-1Zm-.365 3.428A2.5 2.5 0 0 0 13.56 13.8l-.89-.454a1.5 1.5 0 0 1-.656.656l.454.89ZM3.167 4.533c0-.568 0-.964.026-1.273.024-.302.07-.476.137-.608l-.89-.454c-.151.296-.214.616-.244.98-.03.36-.029.803-.029 1.355h1Zm2.7-3.7c-.552 0-.996 0-1.354.029-.365.03-.685.093-.981.243l.454.891c.132-.067.306-.113.608-.137.309-.026.705-.026 1.273-.026v-1ZM3.33 2.652a1.5 1.5 0 0 1 .656-.656l-.454-.89a2.5 2.5 0 0 0-1.093 1.092l.891.454Zm2.004 2.514h5.333v-1H5.334v1Zm0 2.667h5.333v-1H5.334v1Zm0 2.667H8v-1H5.334v1Z"
    />
  </svg>
);

const ImageDocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none">
    <path stroke="#886B4B" strokeLinejoin="round" d="m3.334 14 2.349-3.394c.226-.326.34-.49.488-.566a.666.666 0 0 1 .425-.062c.165.03.32.154.63.402l.362.29c.145.116.217.173.295.19.068.014.14.007.203-.022.073-.032.131-.103.248-.247l1.92-2.346c.259-.316.388-.474.546-.538a.667.667 0 0 1 .437-.022c.164.048.308.193.597.481l1.5 1.5m0-5.133v6.933c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874c-.428.218-.988.218-2.108.218H5.867c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874c-.218-.428-.218-.988-.218-2.108V4.533c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874c.428-.218.988-.218 2.108-.218h4.267c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874c.218.428.218.988.218 2.108ZM8 5.333a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <path stroke="currentColor" strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none">
    <path stroke="#4F7855" strokeLinecap="round" strokeLinejoin="round" d="M2 5.75 4.667 8.5 10 3" />
  </svg>
);

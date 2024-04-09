export default async function handler(req, res) {
  const { email, name, company, groupID } = req.body;
  const time = new Date().toISOString();

  if (!email || !name) {
    return res.status(422).json({ success: false });
  }

  const key =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYjEwZjQyM2YzODhiNmFkMTliOTE0ZmVjNmEyOTU3OTE3ZjYxMzNkNGRjYmVlMTgwYWI2NTI5OWI2ZDI5N2U0ZjY0ZDk4MmFmZTNjOTNiMWIiLCJpYXQiOjE3MTI2NzUzNTkuODYyODI4LCJuYmYiOjE3MTI2NzUzNTkuODYyODMsImV4cCI6NDg2ODM0ODk1OS44NTkzMjksInN1YiI6IjkxMjY5MSIsInNjb3BlcyI6W119.L40_Be0mBQaoQmy-8-wrf84LeZkV9ctCA3TpaqE1CFH34PrylbY17bHs01uFjy2lzOyfmjqbwupus_kcFopremUr6p0NvIem7kvndiuQmjJ84HNMtF8ht1nSUNGc-j_XXdE9t7y57ZgRzhP4PuHoee-tX-JXjkGQKoWuoPzmz2Ja_fByE2hEpyERhfMRkh9XbHh9idW8Z6sqM9iFEktW93QAyWOcwlJ8_Oxa4iTj99I5kK2Zpqjs5vTcTCaxH4IdrMihC_YZUjpxBPwP9JQpZXICUNoto5XDNoY--E028dps6-rBD2hlLJru1ehWoJszMPgevBwZBtMZvi1CuwTCdOgP42fdhw7BKTdGr01rVfd2XV12ejGXFb983up9Ezazd89Y0ulkLcDvc_0jGSB02CzjiCwYefO6wbXxhodzHiUspNPWszC6XCC55sZMg0jtX0pw0IN8ZBLOPwQg7-Oe432_Dl6Ra88hufxpMb2vqHAxNfkdH2FRv1jvTy15lms8lZYUaAYq9bogReeLqgdzsZLfrKsM6qC77ewjToepMqALzaV9jH1LReVWRKw2OwwvZuA7Q396AMmY4KbCzx-9xAJY8rOj_BQdaA-EWwQy5CQ2YQXOZrbbLnogtnykP4_TA018_8NdDdgDFC50Wby3W_s6YgiqktGECuPBKVhpbtU";

  try {
    const api = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${groupID}/subscribers`,
      {
        method: "POST",
        headers: {
          "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: { company },
          email,
          name,
          signup_time: time,
        }),
      }
    );
    console.log(api);
    if (!api.ok) {
      return res.status(422).json({ success: false });
    }
    return res.json({ success: true });
  } catch {
    return res.status(422).json({ success: false });
  }
}

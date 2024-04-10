export default async function handler(req, res) {
  const { email, name, company, groupID } = req.body;
  const time = new Date().toISOString();

  if (!email || !name) {
    return res.status(422).json({ success: false });
  }

  const key =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYTdiMjdlNmIyYzNkODkwNzA2MTNmNGQ1NzU1OTg1ZjAyMmY2MDRiNGJiMTAzNDNjNGI0Y2IwZmY1NTMzZGM2NjQwNjNiYTU2MzFkYmIwMzMiLCJpYXQiOjE3MTI3NDM4NTkuMjExNzEzLCJuYmYiOjE3MTI3NDM4NTkuMjExNzE2LCJleHAiOjQ4Njg0MTc0NTkuMjA3NjY1LCJzdWIiOiI5MTI2OTEiLCJzY29wZXMiOltdfQ.fn2jASjSRbuCqlohzJBZgE3FV9WisS7q_QN2_w-WecIT-fpYCUtQshmFpodk-Lk--rsc3fSurhZ8lYMgg1cmVEwjdId6gTqn-JuadSdAJT_cDWuLSzGmEhj4NRGhCNasvhIEH87vaWSrgFEZPHKCcG91eEpy73fSMv53c71pWXQj3UCBPE8YJpAKKIDm0LDClo9zOtaGVzomO15dlgEsgInAfDdQj5d286pw5_MRkLKlnMtw1Jpd6NcMKenhORYS7T7IC2XWSp4aaupdIJxuxwjpjbvEDh8XIf7yeo8xi3tvtzz5jjfxWx3SCeFfLmig8mSgsWs7n6Rg3pdQ8_4rrCtJmNKKGTIgf6YsDgs3PKwpgh4wTbLoWkVDmBbeebdofOVyrINXbgKK7I6JWI0Y52i0SkwU_i-nrN0V-fhFcDGrTRJwBZd2H0FJu11GhoDppGQk4j3w1wv5pfRrYjGR9ogarTCY9Bx0_SnGYV5XU1JWbKR1pL7EeVX0-G5RrQtkuT56soJT4bE3zByDIIoKJtIMKL6-6LRiABeiOK6nM6UEZa_uK4or-jWXlRridHSnraqPcjc3-pHRjl3pZpNVkslISbjHsim4rjSKAA5hda1uTqatdxwRebU5_gfYbqfsC9AZm-v44LIWw52BxGEoXhAgKYxG6W2DJLGaUdLQDPA";

  try {
    const api = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${groupID}/subscribers`,
      {
        method: "POST",
        headers: {
          "X-MailerLite-ApiKey": key,
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
    const response = await api.json();

    if (!api.ok) {
      return res
        .status(422)
        .json({ success: false, error: response.error.message });
    }
    return res.json({ success: true });
  } catch {
    return res.status(422).json({ success: false });
  }
}

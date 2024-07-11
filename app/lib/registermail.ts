import nodemailer from "nodemailer";
import { RegisterData } from "./definitions";
import generator from 'generate-password'
import { getFireUser, registerFireUser } from "./firestoredb";
import { z } from "zod";


export default async function registerMail(form: RegisterData) {
  
  let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_PROVIDER,
        pass: process.env.EMAIL_PROVIDER_PASS
      }
  });

  let password = generator.generate({
    length: 10,
	  numbers: true,
    excludeSimilarCharacters: true
  });
  
  const mailContent = {
    from: process.env.EMAIL_PROVIDER,
    to: form.email,
    subject:"welcome to our site",
    text: `Hi ${form.userName},
    you have joined our website use these credintials to log into our website \n

    email: ${form.email} \n
    
    password: ${password}`,
    //html: "<p>HTML version of the message</p>",
  };
  
  try {
    // validate user input on server
    const userEmail = z.string().email();
    userEmail.parse(form.email);

    const user = await getFireUser(form.email);
    
    if (user) return { status: false, message: 'This Email is registered try to login!' };
        
    //todo add user to database
    const saveUser = await registerFireUser({
      name: form.userName,
      password: password,
      email: form.email,
      lessonsViewed: [''],
      occupation: form.occupation,
      company: form.company
    })

    if (!saveUser) return { status: false, message: 'Error registering user please try again!' };

    const info = await transporter.sendMail(mailContent);    

    console.log(info);

    return { status: true, message: 'Email sent successfully!' }

  } catch (error) {
    
    console.log(error);
        
    return { status: false, message: 'Error sending email please try again!' }
  
  }

}
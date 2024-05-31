// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type RegisterData = {
  userName: string;
  email: string;
  company: string;
  occupation: string;
};
  
export type PasswordCheck = {
  password1: string;
  password2: string ;
  token: string | null;
}

export type FireUser = {
  email: string;
  password: string;
  name: string;
  lessonsViewed: string[];
  occupation: string;
  company: string;
}
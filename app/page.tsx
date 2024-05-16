import Link from 'next/link';

export default function Login() {

  return (
    <div className='container' style={{"maxWidth": "500px"}}>
      <h1 style={{"textAlign": "center"}}>welcome to our course</h1>
      <div className='grid'>
        <Link href="/login">
          <input
            type="submit"
            value="Log in"
            />
        </Link>

        <Link href="/register">
          <input
            type="submit"
            value="Register"
            />
        </Link>
      </div>
    </div>
  );
}

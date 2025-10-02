import AuthForm from "../components/authForm";

export default function Login() {
    return (
        <>
            <div className="bg-slate-50 min-h-screen min-w-screen flex justify-center items-center">
                <AuthForm type="Login" />
            </div>
        </>
    )
}
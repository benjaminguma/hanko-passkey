import Image from "next/image";
import FormRegisterPasskey from "../../components/FormRegisterPasskey";
import FormPasskeyLogin from "../../components/FormPasskeyLogin";

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<FormRegisterPasskey />
			<FormPasskeyLogin />
		</main>
	);
}

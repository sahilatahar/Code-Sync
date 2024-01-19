import illustration from "../assets/illustration.svg";
import FormComponent from "../components/Home/FormComponent";
// import Footer from "../components/Home/Footer";

function Home() {
	return (
		<div className="min-h-screen flex items-center justify-center flex-col gap-16">
			<div className="flex-col sm:flex-row min-w-full h-full flex justify-evenly items-center pt-12 sm:pt-0">
				<div className="w-full sm:w-auto flex justify-center animate-up-down">
					<img
						src={illustration}
						alt=""
						className="w-[250px] mx-auto sm:w-[400px]"
					/>
				</div>
				<FormComponent />
			</div>
			{/* <Footer /> */}
		</div>
	);
}

export default Home;

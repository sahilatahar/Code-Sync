import illustration from "../assets/illustration.svg"
import FormComponent from "../components/forms/FormComponent"
// import Footer from "../components/common/Footer";

function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-16">
            <div className="flex h-full min-w-full flex-col items-center justify-evenly pt-12 sm:flex-row sm:pt-0">
                <div className="flex w-full animate-up-down justify-center sm:w-auto sm:pl-4">
                    <img
                        src={illustration}
                        alt=""
                        className="mx-auto w-[250px] sm:w-[400px]"
                    />
                </div>
                <FormComponent />
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default HomePage

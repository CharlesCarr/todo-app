import Form from "../components/Form";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-20 px-4 sm:px-0">
      <div className="border border-white rounded-2xl min-h-[450px] w-full sm:w-5/6 md:w-3/4 xl:w-1/2 flex flex-col justify-center items-center py-2">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide mb-4">Rapptr Labs</h1>
        <Form />
      </div>
    </div>
  );
}

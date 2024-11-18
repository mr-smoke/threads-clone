import Loading from "@/components/Loading";
import useFreeze from "@/hooks/useFreeze";

const Freeze = () => {
  const { freeze, isLoading } = useFreeze();

  return (
    <main className="flex flex-col justify-center">
      <section className="flex flex-col py-4 px-6">
        <h1 className="text-2xl font-bold">Freeze Account</h1>
        <p className="mt-4">
          Freezing your account will disable your account and profile until you
          decide to unfreeze it.
        </p>
        <button
          className="mt-4 w-full py-2 px-4 bg-red-500 font-semibold rounded-lg hover:bg-red-600"
          onClick={freeze}
          disabled={isLoading}
        >
          {isLoading ? <Loading /> : "Freeze Account"}
        </button>
      </section>
    </main>
  );
};

export default Freeze;

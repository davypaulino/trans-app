import Background from '@/app/_components/background';
import { BtnLogin } from "./_components/btns/btns";

export default function Home() {
  return (
    <section>
      <Background />
      <div className="mx-auto max-w-2xl py-5 sm:py-12 lg:py-12 pt-20">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Start playing now!
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Create your account or sign up to start playing now with friends.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <BtnLogin />
          </div>
        </div>
      </div>
    </section>
  );
}
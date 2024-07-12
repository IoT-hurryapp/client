import SimpleStatistics from "./components/SimpleStatistics";
import { NeonGradientCard } from "../../components/magic-ui/neon-gradient-card";
import CallToAction from "./components/CallToAction";
import ArrowPointing from "./components/Arrow";
export default function Home() {
  return (
    <div className="bg-background">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-200 dark:from-emerald-800 dark:to-blue-800 to-blue-300 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 lg:pb-20 mb-4">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              نعلن عن منصتنا التي تستخدم انترنيت الاشياء من اجل بيئة سليمة.
            </div>
          </div>
          <div className="w-fit text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl">
              حارس الهواء الخاص بك
            </h1>
            <p className="mt-6 text-lg  text-gray-600 dark:text-gray-400 leading-6">
              ابقى مطلعا وتنفس براحة بال مع منصتنا, انشىء حسابك واضف الموقع
              المطلوب و بعدها سوف تحصل على قراءات و تنبيهات تضمن لك بيئة صحية لك
              ولاحبابك
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <CallToAction />
            </div>
          </div>
        </div>
        <div className="flex items-center flex-col mt-[11rem]">
          <h1 className="text-3xl md:text-4xl font-bold">
            كيف تستخدم المنصة ؟
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            مزودة بميزات قوية من اجل ضمان بيئة سليمة.
          </p>
        </div>
        <div className="container flex justify-center w-full scale-125 my-24">
          <NeonGradientCard className="max-w-sm items-center justify-center text-center w-full">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
            ></iframe>
          </NeonGradientCard>
        </div>
        <ArrowPointing />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-emerald-200 dark:from-emerald-800 dark:to-blue-800 to-blue-300 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <SimpleStatistics />
    </div>
  );
}

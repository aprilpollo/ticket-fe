import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import {
  LoaderFive,
  LoaderBarGithub,
  LoaderBarAnimated,
  LoaderBarYoutube,
  LoaderBarIndeterminate,
} from "@/components/ui/loader";

interface LoaderContextType {
  loader: boolean;
  isLoaderBarAnimated: boolean;
  isLoaderBarGithub: boolean;
  isLoaderBarYoutube: boolean;
  isLoaderBarIndeterminate: boolean;
  githubProgress: number;
  youtubeProgress: number;
  setLoader: (value: boolean) => void;
  setLoaderBarAnimated: (value: boolean) => void;
  setLoaderBarGithub: (value: boolean) => void;
  setLoaderBarYoutube: (value: boolean) => void;
  setLoaderBarIndeterminate: (value: boolean) => void;
  setGithubProgress: (value: number) => void;
  setYoutubeProgress: (value: number) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loader, setLoader] = useState<boolean>(true);
  const [isLoaderBarAnimated, setLoaderBarAnimated] = useState<boolean>(false);
  const [isLoaderBarGithub, setLoaderBarGithub] = useState<boolean>(false);
  const [isLoaderBarYoutube, setLoaderBarYoutube] = useState<boolean>(false);
  const [githubProgress, setGithubProgress] = useState<number>(0);
  const [youtubeProgress, setYoutubeProgress] = useState<number>(0);
  const [isLoaderBarIndeterminate, setLoaderBarIndeterminate] =
    useState<boolean>(false);

  return (
    <LoaderContext.Provider
      value={{
        loader,
        isLoaderBarAnimated,
        isLoaderBarGithub,
        isLoaderBarYoutube,
        isLoaderBarIndeterminate,
        githubProgress,
        youtubeProgress,
        setLoader,
        setLoaderBarAnimated,
        setLoaderBarGithub,
        setLoaderBarYoutube,
        setLoaderBarIndeterminate,
        setGithubProgress,
        setYoutubeProgress,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}

export function Loader() {
  const {
    loader,
    isLoaderBarAnimated,
    isLoaderBarGithub,
    isLoaderBarYoutube,
    isLoaderBarIndeterminate,
    githubProgress,
    youtubeProgress,
  } = useLoader();

  return (
    <>
      {loader && (
        <div className="absolute flex flex-col gap-2 h-screen w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20">
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.3}
            duration={3}
            repeatDelay={0.5}
            width={54}
            height={54}
            className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
          />
          <img src="/logo.svg" alt="Loading..." className="size-24 z-50" />
          <LoaderFive text="Loading ..." />
        </div>
      )}
      {isLoaderBarAnimated && <LoaderBarAnimated />}
      {isLoaderBarGithub && <LoaderBarGithub progress={githubProgress} />}
      {isLoaderBarYoutube && <LoaderBarYoutube progress={youtubeProgress} />}
      {isLoaderBarIndeterminate && <LoaderBarIndeterminate />}
    </>
  );
}

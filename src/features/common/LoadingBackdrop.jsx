import { Loader } from "@mantine/core";

const LoadingBackdrop = () => {
  return (
    <div
      className="fixed inset-0 z-[1300] flex items-center justify-center bg-white/50 backdrop-blur-sm"
      role="status"
      aria-label="Wird geladen"
    >
      <Loader color="#2A85FF" size="md" type="bars" />
    </div>
  );
};

export default LoadingBackdrop;

import { Toaster } from 'react-hot-toast'

/** Theme-aware react-hot-toast container. Mount once near the app root. */
export default function AppToaster() {
  return (
    <Toaster
      position="bottom-center"
      gutter={10}
      containerClassName="!bottom-6"
      toastOptions={{
        duration: 3200,
        className:
          '!rounded-2xl !border !border-base-300/70 !bg-base-100 !px-4 !py-3 !text-sm !font-medium !text-base-content !shadow-lift',
        success: { iconTheme: { primary: '#5F8F63', secondary: '#FBF5EC' } },
        error: { iconTheme: { primary: '#BF5540', secondary: '#FBF5EC' } },
        loading: { iconTheme: { primary: '#C4915F', secondary: '#FBF5EC' } },
      }}
    />
  )
}

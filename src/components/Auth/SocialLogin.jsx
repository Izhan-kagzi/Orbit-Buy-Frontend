import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    // Frontend only
    // Replace with Firebase/Auth0/backend later

    toast(`${provider} login will be available soon.`, {
      icon: "🚀",
    });
  };

  const socialButtons = [
    {
      id: "google",
      name: "Google",
      icon: <FcGoogle size={24} />,
      bg: "bg-white",
      border: "border-gray-300",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: <FaFacebookF size={20} />,
      bg: "bg-[#1877F2]",
      text: "text-white",
    },
    {
      id: "apple",
      name: "Apple",
      icon: <FaApple size={22} />,
      bg: "bg-brand-primary",
      text: "text-white",
    },
  ];

  return (
    <div className="space-y-4">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {socialButtons.map((button) => (

          <button
            key={button.id}
            type="button"
            onClick={() =>
              handleSocialLogin(button.name)
            }
            className={`
              flex
              items-center
              justify-center
              gap-3
              h-14
              rounded-xl
              border
              font-semibold
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-lg

              ${button.bg}
              ${button.border || "border-transparent"}
              ${button.text || "text-gray-800"}
            `}
          >
            {button.icon}

            <span>
              {button.name}
            </span>

          </button>

        ))}

      </div>

      <p className="text-center text-sm text-gray-500">

        Social login is currently available as a frontend
        preview. Connect Firebase, Auth0 or your backend
        later to enable authentication.

      </p>

    </div>
  );
};

export default SocialLogin;
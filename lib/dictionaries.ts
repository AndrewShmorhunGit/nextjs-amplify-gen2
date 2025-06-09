export type Locale = "en" | "ru";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ru: () => import("@/dictionaries/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    return dictionaries.en();
  }
  return dictionaries[locale]();
};

export const locales: Locale[] = ["en", "ru"];
export const defaultLocale: Locale = "en";

export const localeNames = {
  en: "en",
  ru: "ru",
};

export const amplifyDictionary = {
  en: {
    // General
    "Sign In": "Sign In",
    "Sign Up": "Sign Up",
    "Create Account": "Create Account",
    "Forgot your password?": "Forgot your password?",
    "Reset Password": "Reset Password",
    "Back to Sign In": "Back to Sign In",
    Submit: "Submit",
    "Loading...": "Loading...",
    Confirm: "Confirm",
    "Resend Code": "Resend Code",

    // Fields
    Email: "Email",
    Password: "Password",
    "New Password": "New Password",
    "Confirm Password": "Confirm Password",
    "Preferred Username": "Preferred Username",

    // Placeholders
    "Enter your Email": "Enter your Email",
    "Enter your Password": "Enter your Password",
    "Enter your New Password": "Enter your New Password",
    "Please confirm your Password": "Please confirm your Password",
    "Enter your Preferred Username": "Enter your Preferred Username",

    // Validations
    "Password must have at least 8 characters":
      "Password must have at least 8 characters",
    "Password must have lower case letters":
      "Password must have lower case letters",
    "Password must have upper case letters":
      "Password must have upper case letters",
    "Password must have numbers": "Password must have numbers",
    "Password must have special characters":
      "Password must have special characters",
    "Your passwords must match": "Your passwords must match",

    // Errors
    "User does not exist.": "User does not exist.",
    "Incorrect username or password.": "Incorrect username or password.",
    "User already exists": "User already exists",
    "Invalid verification code provided, please try again.":
      "Invalid verification code, please try again.",
    "An account with the given email already exists.":
      "An account with this email already exists.",
    "Invalid password format": "Invalid password format",
    "Network error": "Network error",
    "Something went wrong": "Something went wrong",

    // MFA / Confirmation
    "Confirmation Code": "Confirmation Code",
    "Enter your Confirmation Code": "Enter your Confirmation Code",
    "Code sent": "Verification code sent",
    "Code resent successfully": "Code resent successfully",
  },

  ru: {
    // General
    "Sign in": "Войти",
    "Sign In": "Войти",
    "Sign Up": "Регистрация",
    "Create Account": "Создать аккаунт",
    "Forgot your password?": "Забыли пароль?",
    "Reset Password": "Сброс пароля",
    "Back to Sign In": "Назад ко входу",
    Submit: "Отправить",
    "Loading...": "Загрузка...",
    Confirm: "Подтвердить",
    "Resend Code": "Отправить код повторно",

    // Fields
    Email: "Почта",
    Password: "Пароль",
    "New Password": "Новый пароль",
    "Confirm Password": "Подтвердите пароль",
    "Preferred Username": "Имя пользователя",

    // Placeholders
    "Enter your Email": "Введите почту",
    "Enter your Password": "Введите пароль",
    "Enter your New Password": "Введите новый пароль",
    "Please confirm your Password": "Пожалуйста, подтвердите пароль",
    "Enter your Preferred Username": "Введите имя пользователя",

    // Validations
    "Password must have at least 8 characters":
      "Пароль должен содержать минимум 8 символов",
    "Password must have lower case letters":
      "Пароль должен содержать строчные буквы",
    "Password must have upper case letters":
      "Пароль должен содержать заглавные буквы",
    "Password must have numbers": "Пароль должен содержать цифры",
    "Password must have special characters":
      "Пароль должен содержать специальные символы",
    "Your passwords must match": "Пароли должны совпадать",

    // Errors
    "User does not exist.": "Пользователь не найден.",
    "Incorrect username or password.": "Неверное имя пользователя или пароль.",
    "User already exists": "Пользователь уже существует",
    "Invalid verification code provided, please try again.":
      "Неверный код подтверждения, попробуйте снова.",
    "An account with the given email already exists.":
      "Аккаунт с такой почтой уже существует.",
    "Invalid password format": "Недопустимый формат пароля",
    "Network error": "Ошибка сети",
    "Something went wrong": "Что-то пошло не так",

    // MFA / Confirmation
    "Confirmation Code": "Код подтверждения",
    "Enter your Confirmation Code": "Введите код подтверждения",
    "Code sent": "Код подтверждения отправлен",
    "Code resent successfully": "Код повторно отправлен успешно",
  },
};

/* We Emailed You
Your code is on the way. To log in, enter the code we emailed to a***@g***. It may take a minute to arrive. */

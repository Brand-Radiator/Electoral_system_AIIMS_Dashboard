// images
import userAvatar from "../../../assets/images/users/avatar-7.jpg";

export interface UserInfoTypes {
  userName?: string;
  avatar?: string;
  designation?: string;
  location?: string;
  profileProgress: number;
  about?: string;
  email?: string;
  phone?: string;
  address?: string;
  skills?: string[];
}

const userInfo: UserInfoTypes = {
  userName: "Dr. Viany",
  designation: "Assistant Professor",
  location: "Saifai Etawah",
  avatar: userAvatar,
  profileProgress: 60,
  about: "Hi I'm Dr. Viany.",
  email: "xyz123@gmail.com",
  phone: "(123) 123 1234",
  address: "Saifai Etawah, Uttar Pradesh, India - 94108",
  skills: [],
};

export { userInfo };

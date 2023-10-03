import { nanoid } from "nanoid";
import { Home, Services } from "../screens";
import {
  Principal,
  Email,
  Name,
  Gender,
  Password,
  Username,
  Photos,
} from "../screens/Register";

import { Root as RootRegister } from "../screens";
import { Root as RootSearch } from "../screens/Search";
import { RootProfile } from "../screens/Profile";
import { RootSettings } from "../screens/Settings";
import { LoginEmail, PasswordEmail } from "../screens/Login";
import { LoginPrincipal } from "../screens/Login";
import { ActionsRoot } from "../screens/Actions";
import { MessageRoot } from "../screens/Messages";
import {
  CreatePostCategory,
  CreatePostDetails,
  CreatePostHashtag,
  CreatePostImages,
  CreatePostName,
  CreatePostPrice,
  CreatePostStatus,
} from "../screens/CreatePost";
import { DetailsProduct } from "../screens/Product";

export const LIST_ROUTES_UNAUTHENTICATED = [
  {
    id: nanoid(3),
    component: RootRegister,
    path: "/",
  },
  {
    id: nanoid(3),
    component: LoginEmail,
    path: "/login-email",
  },
  {
    id: nanoid(3),
    component: PasswordEmail,
    path: "/login-password",
  },
  {
    id: nanoid(3),
    component: LoginPrincipal,
    path: "/login",
  },
  {
    id: nanoid(3),
    component: Principal,
    path: "/register",
  },
  {
    id: nanoid(3),
    component: Email,
    path: "/register-email",
  },
  {
    id: nanoid(3),
    component: Password,
    path: "/register-password",
  },
];

export const LIST_ROUTES_AUTHENTICATED = [
  {
    id: nanoid(3),
    component: Home,
    path: "/home",
  },
  {
    id: nanoid(3),
    component: Name,
    path: "/register-name",
  },
  {
    id: nanoid(3),
    component: Username,
    path: "/register-username",
  },
  {
    id: nanoid(3),
    component: Gender,
    path: "/register-gender",
  },
  {
    id: nanoid(3),
    component: Photos,
    path: "/register-photos",
  },
  {
    id: nanoid(3),
    component: RootSearch,
    path: "/search",
  },
  {
    id: nanoid(3),
    component: MessageRoot,
    path: "/messages",
  },
  {
    id: nanoid(3),
    component: RootProfile,
    path: "/profile",
  },
  {
    id: nanoid(3),
    component: RootSettings,
    path: "/settings",
  },
  {
    id: nanoid(3),
    component: ActionsRoot,
    path: "/actions",
  },
  {
    id: nanoid(3),
    component: CreatePostName,
    path: "/create-post-name",
  },
  {
    id: nanoid(3),
    component: CreatePostStatus,
    path: "/create-post-status",
  },
  {
    id: nanoid(3),
    component: CreatePostCategory,
    path: "/create-post-category",
  },
  {
    id: nanoid(3),
    component: CreatePostDetails,
    path: "/create-post-details",
  },
  {
    id: nanoid(3),
    component: CreatePostImages,
    path: "/create-post-images",
  },
  {
    id: nanoid(3),
    component: CreatePostHashtag,
    path: "/create-post-hashtag",
  },
  {
    id: nanoid(3),
    component: CreatePostPrice,
    path: "/create-post-price",
  },
  {
    id: nanoid(3),
    component: DetailsProduct,
    path: "/product/:id",
  },
  {
    id: nanoid(3),
    component: Services,
    path: "/services",
  },
];

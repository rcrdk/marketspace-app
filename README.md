# 🛍️ React Native Marketspace App
This is a app designed to simplify the process of buying and selling products.  The app was developed as a challenge during my lessons at [Rocketseat](https://rocketseat.com.br/).

---

<p align="center">
  <img alt="React Native Marketspace App Preview" src="https://github.com/rcrdk/marketspace-app/blob/main/public/app.jpg?raw=true" width="100%" />
</p>

## 📱 Features
- **Authentication**
  - Sign-in and Sign-up screens for user access.
  
- **Dashboard**
  - Displays the number of active products the user is selling.
  - Shows a list of products available to buy with filtering options:
    - Query (search bar)
    - Product condition (new/used)
    - Payment methods
    - Accept trade option

- **Product Details**
  - View detailed information about a product, including:
    - Product images
    - Name and description
    - Pricing
    - Accepted payment methods
    - Seller's contact information

- **Product Management**
  - Manage the products you're selling:
    - Create and edit product listings with preview before publishing.
    - Toggle product availability (active/inactive)

## ⚙️ Tech Stack
- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/) + [FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/) + [ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [React Navigation](https://reactnavigation.org/docs/getting-started/): Stack and Bottom Tabs
- [Gluestack UI V2](https://gluestack.io)
- [React Hook Form](https://www.react-hook-form.com/) + [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)

## 🚚 API
It was used an already existent API to develop this app, [check it out](https://github.com/rocketseat-education/ignite-rn-2022-challenge-marketspace-api).

## 🎨 Figma
The UI design was provied by Rocketseat, [check it out](https://www.figma.com/design/QDIc1W4grpfoy3kkPWVFB5/Marketspace-%E2%80%A2-Desafio-React-Native?m=auto&t=PITYEBLaaZA07HGW-6).
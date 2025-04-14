# Newsly - mobile RSS Reader application

Newsly is a simple and easy to use mobile application built with React Native. It allows you to choose the type of feeds
you want to browse by simply adding the URL you want. You can also filter the content you see and find the article you
want just by typing its title. You can also add the most interesting articles to your 'favourites' list.

**Presentation of the RSS reader application project:**
https://youtu.be/jh_DAfOFs7Q

## Trello Board

> https://trello.com/b/x6Q4i5J0/rss-reader

## Application Features

1. **Add RSS Feeds** - You can manually add and manage RSS feed URLs to track your favorite news sources.
2. **Display News Articles** - Articles are shown in a clean card layout with a title, image (if available),
   description and publication date.
3. **Sorted by Date** - All news articles are automatically sorted in descending order by publication date.
4. **Mark as Favorite** - You can mark news articles as favorites and later browse them in a separate view.
5. **Search by Title** - The app includes a search input to quickly filter articles by their titles.
6. **Modern UI** - The design is minimal, elegant, and fully responsive for mobile screens on both Android and iOS.

---

## Getting Started

Before running this app, make sure your environment is properly set up for React Native development.

> 📚 Follow the official guide to [Set Up Your Environment](https://reactnative.dev/docs/environment-setup) based on your
> operating system (Windows/Mac/Linux) and target platform (Android/iOS).

### Step 1: Clone repository and install dependencies

Clone the repository by executing this command:

```bash
git clone https://github.com/AleksandraKoz/RSS-reader.git
cd rss-reader
```

Install the required JavaScript dependencies by running one of the following commands:

```bash
npm install
# or
yarn install
```

---

### Step 2: Start Metro bundler and run the app

#### iOS

> 📚 Make sure you have [CocoaPods](https://cocoapods.org/) installed.

First, install the necessary packages for iOS by running the following command:

```bash
cd ios && pod install
```

Then run the actual application using one of the commands:

```bash
npm run ios
# or
yarn ios
```

> 💡 You can also open the project in Xcode and run it from there.

#### Android

```bash
npm run android
# or
yarn android
```

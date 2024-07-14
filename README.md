# Jammming

Jammming is a react application run directly on a web browser and allows you to search for songs in the Spotify database based on a given keyword or a keyphrase. Consequently, you can add those songs to a newly created playlist directly in Jammming app and export it to your Spotify account.

> if you want to learn more about Spotify streaming and podcasting service, [click here](https://en.wikipedia.org/wiki/Spotify).

Jammming provides quicker and user-friendlier way of creating a Spotify playlist.

## How to use Jammming
> Some of the detailed instructions below (such as website button locations) are only applicable for desktop-sized windows of the needed Spotify webpages. Therefore, **I recommend using desktop for the entire time of the initial setup**.
1. First things first, you should already have an existing Spotify account. If you do not have any, create one directly at [Spotify](https://open.spotify.com/).  
No paid subscription plan of Spotify is not needed for Jammming to function correctly. 
After you set up your account, move on to the next step.
### Registering the app in your Spotify and generating Client ID 
Since using Jammming requests songs within the Spotify database   via Spotify Web API, the following steps are needed.

2. Go to [Spotify for Developers](https://developer.spotify.com/) and in the right upper corner click on your user account button and then **Dashboard** 
![Image](./public/how-to-img/spotifyDev-dashboard.png)
3. Once on the dashboard, click **Create app** button
4. Now you should see a form with the required information about the an app which is going to be requesting data via Spotify Web API in order to obtain the lists of the searched songs.
Fill in the form as on the pictures below and click **Save** button.
![Image](./public/how-to-img/spotify-createApp-form1.png)
![Image](./public/how-to-img/spotify-createApp-form2.png)
5. Now you should be redirected to Home page of the jammming app. If not, you can access the app from the dashboard. Then click the **Settings** button.
![Image](./public/how-to-img/spotify-app-dashboard-settings.png)
6. You should now see Basic Information page and your Client ID in the first field.
Copy the Client ID.
![Image](./public/how-to-img/spotify-clientID-field.png)

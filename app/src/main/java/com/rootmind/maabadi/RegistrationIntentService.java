package com.rootmind.maabadi;

/**
 * Created by ROOTMIND on 3/29/2016.
 */


import android.app.IntentService;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;

//import com.google.android.gms.gcm.GcmPubSub;
//import com.google.android.gms.iid.InstanceID;

import com.google.firebase.iid.FirebaseInstanceId;

import java.io.IOException;
public class RegistrationIntentService extends IntentService {

    private static final String TAG = "RegIntentService";
    private static final String[] TOPICS = {"global"};
    //Context context=this;
    public RegistrationIntentService() {
        super(TAG);
    }
    public static final String SENT_TOKEN_TO_SERVER = "sentTokenToServer";
    public static final String FCM_TOKEN = "fcmToken";

    @Override
    public void onHandleIntent(Intent intent) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        //String refreshedToken =null;
        try {

            // [START register_for_gcm]
            // Initially this call goes out to the network to retrieve the token, subsequent calls
            // are local.
            // R.string.gcm_defaultSenderId (the Sender ID) is typically derived from google-services.json.
            // See https://developers.google.com/cloud-messaging/android/start for details on this file.
            // [START get_token]

            String refreshedToken = FirebaseInstanceId.getInstance().getToken();
            Log.d(TAG, "Refreshed token: " + refreshedToken);
            //Log.i(TAG, "InstanceID::::: " + instanceID.getId());
//            String scope = "GCM";
//            token = instanceID.getToken("55941922715",scope);
            try{

                sharedPreferences.edit().putString(FCM_TOKEN, refreshedToken).apply();
                sendRegistrationToServer(refreshedToken);
            }
            catch(Exception e){
               // Toast.makeText(getApplicationContext(), "Failed to complete sharedPreferences " + e, Toast.LENGTH_LONG).show();
            }

            // [END get_token]

            // TODO: Implement this method to send any registration to your app's servers.
            // Subscribe to topic channels
            //subscribeTopics(token);

            // You should store a boolean that indicates whether the generated token has been
            // sent to your server. If the boolean is false, send the token to your server,
            // otherwise your server should have already received the token.
           // sharedPreferences.edit().putBoolean(QuickstartPreferences.SENT_TOKEN_TO_SERVER, true).apply();
            // [END register_for_gcm]
        } catch (Exception e) {

             //Toast.makeText(getApplicationContext(), "Failed to complete token refresh " + e, Toast.LENGTH_LONG).show();
            // If an exception happens while fetching the new token or updating our registration data
            // on a third-party server, this ensures that we'll attempt the update at a later time.
           // sharedPreferences.edit().putBoolean(QuickstartPreferences.SENT_TOKEN_TO_SERVER, false).apply();
        }
        // Notify UI that registration has completed, so the progress indicator can be hidden.
      //  Intent registrationComplete = new Intent(QuickstartPreferences.REGISTRATION_COMPLETE);
      //  LocalBroadcastManager.getInstance(this).sendBroadcast(registrationComplete);
      //
            //return token;
        }

    /**
     * Persist registration to third-party servers.
     *
     * Modify this method to associate the user's GCM registration token with any server-side account
     * maintained by your application.
     *
     * @param token The new token.
     */
    private void sendRegistrationToServer(String token) {
        // Add custom implementation, as needed.

        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        sharedPreferences.edit().putBoolean(SENT_TOKEN_TO_SERVER, true).apply();

        //Toast.makeText(getApplicationContext(), "Token in gcm::: "+token, Toast.LENGTH_LONG).show();


    }

    /**
     * Subscribe to any GCM topics of interest, as defined by the TOPICS constant.
     *
     * @param token GCM token
     * @throws IOException if unable to reach the GCM PubSub service
     */
    // [START subscribe_topics]
//    private void subscribeTopics(String token) throws IOException {
//        GcmPubSub pubSub = GcmPubSub.getInstance(this);
//        for (String topic : TOPICS) {
//            pubSub.subscribe(token, "/topics/" + topic, null);
//        }
//    }
    // [END subscribe_topics]

}

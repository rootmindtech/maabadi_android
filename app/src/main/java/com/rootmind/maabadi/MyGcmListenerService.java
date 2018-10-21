package com.rootmind.maabadi;

/**
 * Created by ROOTMIND on 3/29/2016.
 */
//import com.google.android.gms.gcm.GcmListenerService;

import android.os.Bundle;
import android.content.Intent;
import android.app.PendingIntent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.content.Context;
import android.app.NotificationManager;
import android.support.v4.app.NotificationCompat;

public class MyGcmListenerService  {

//    extends GcmListenerService
//
//    private static final String TAG = "MyGcmListenerService";
//
//
//    /**
//     * Called when message is received.
//     *
//     * @param from SenderID of the sender.
//     * @param data Data bundle containing message data as key/value pairs.
//     *             For Set of keys use data.keySet().
//     */
//    // [START receive_message]
//    @Override
//    public void onMessageReceived(String from, Bundle data) {
//
//        String message = data.getString("message");
//        //Log.d(TAG, "From: " + from);
//        //Log.d(TAG, "Message: " + message);
//
//
//       //Toast.makeText(getApplicationContext(), "from::: " + from, Toast.LENGTH_LONG).show();
//       // Toast.makeText(getApplicationContext(), "message::: " + message, Toast.LENGTH_LONG).show();
//        if (from.startsWith("/topics/")) {
//            // message received from some topic.
//        } else {
//            // normal downstream message.
//        }
//
//        // [START_EXCLUDE]
//        /**
//         * Production applications would usually process the message here.
//         * Eg: - Syncing with server.
//         *     - Store message in local database.
//         *     - Update UI.
//         */
//
//        /**
//         * In some cases it may be useful to show a notification indicating to the user
//         * that a message was received.
//         */
//        sendNotification(message);
//        // [END_EXCLUDE]
//    }
//    // [END receive_message]
//
//
//    /**
//     * Create and show a simple notification containing the received GCM message.
//     *
//     * @param message GCM message received.
//     */
//    private void sendNotification(String message) {
//
//
//        Intent intent = new Intent(this, MainActivity.class);
//        //intent.putExtra("message", message);
//        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
//
//        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0 /* Request code */, intent, PendingIntent.FLAG_ONE_SHOT);
//
//        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
//       //Toast.makeText(getApplicationContext(), "Notification Message::: " + message, Toast.LENGTH_LONG).show();
//
//
//        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
//                .setSmallIcon(R.drawable.school_icon)
//                .setContentTitle("School App")
//                .setContentText(message)
//                .setAutoCancel(true)
//                .setSound(defaultSoundUri)                        //Settings.System.DEFAULT_NOTIFICATION_URI)
//                .setContentIntent(pendingIntent);
//
//
//        NotificationManager notificationManager =
//                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
//
//
//        notificationManager.notify(0 /* ID of notification */, notificationBuilder.build());
//    }

}

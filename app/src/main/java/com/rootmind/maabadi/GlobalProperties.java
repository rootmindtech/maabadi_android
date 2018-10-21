package com.rootmind.maabadi;

import android.app.Application;

/**
 * Created by ROOTMIND on 3/30/2016.
 */
public class GlobalProperties extends Application {

    private String fcmTokenID;

    public String getGcmTokenID() {
        return fcmTokenID;
    }

    public void setFcmTokenID(String fcmTokenID) {
        this.fcmTokenID = fcmTokenID;
    }
}

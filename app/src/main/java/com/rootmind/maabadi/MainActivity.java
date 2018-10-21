package com.rootmind.maabadi;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;


import android.content.Intent;
import android.os.Bundle;
import android.app.Activity;
import android.os.Handler;

import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.annotation.SuppressLint;

import com.google.firebase.iid.FirebaseInstanceId;

//import com.google.firebase.messaging.FirebaseMessaging;


public class MainActivity extends Activity {


    private Handler mHandler = new Handler();
    private static final String TAG = "MainActivity";
    WebView webView;


    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {

//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);

        super.onCreate(savedInstanceState);
        //super.setIntegerProperty("loadUrlTimeoutValue", 60000);
        // Set by <content src="index.html" /> in config.xml
        // loadUrl(launchUrl);


//        FirebaseMessaging.getInstance().setAutoInitEnabled(true);


        setContentView(R.layout.activity_main);

        webView = (WebView) findViewById(R.id.fullscreen_content);

        WebSettings webSettings = webView.getSettings();

        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadsImagesAutomatically(true);
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
       /* webSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        webSettings.setAppCacheMaxSize(8 * 1024 * 1024); // 8MB
        webSettings.setAppCachePath(getApplicationContext().getCacheDir().getAbsolutePath());
        webSettings.setAllowFileAccessFromFileURLs(true);*/
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setAllowFileAccess(true);


        webView.setWebViewClient(new MyWebViewClient());

        webView.addJavascriptInterface(new WebAppInterface(this), "Android");

        Intent firebaseIntent = new Intent(this, MyFirebaseInstanceIDService.class);
        startService(firebaseIntent);

        Intent intent = new Intent(this, RegistrationIntentService.class);
        startService(intent);



        //String msgToSend = "d7WX4aaCHIA:APA91bE1vbhCltXu7BDaul7EcPV8XKY5RuP05rUNsJjzakZJ1h8eEXrOZAqyb-1q3-2hyCYXuc69_sA85V5JOi7maPeoBodCSnurn1E4lygvOib7ZWmAPouPrOOaP7eDiYWomtGqB6EH";
        //webView.loadUrl("javascript:callFromActivity(\""+token+"\")");

        if (savedInstanceState == null)
        {
            // Load a page
            webView.loadUrl("file:///android_asset/www/index.html");
        }
    }

    @Override
    public void onBackPressed() {

        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);//  .FLAG_ACTIVITY_CLEAR_TOP);  /*//***Change Here***
        startActivity(intent);
        finish();

        //System.exit(0);


    }

}

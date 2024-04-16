package com.eazzy;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PrintModule extends ReactContextBaseJavaModule {

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

    PrintModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return null;
    }

    @ReactMethod()
    public void createPrintModuleEvent(String name, String location) {
        Log.d("PrintModule", "Create event called with name: " + name
                + " and location: " + location);
    }
}
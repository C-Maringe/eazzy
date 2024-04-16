package com.eazzy

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import org.json.JSONObject

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CalendarModule"

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun createCalendarEvent(name: String, location: String) {
        Log.d("CalendarModule", "Create event called with name: $name and location: $location")

        try {
            // Example: Create an instance of PrintReceipt and call its method
            val resources = reactApplicationContext.resources
            val response = JSONObject() // This is an example, you should provide an actual JSONObject
            val cardNumber = "123456789" // This is an example, you should provide an actual card number
            PrintReceipt(resources, 0, response, cardNumber, false, true)
        } catch (e: Exception) {
            // Handle exceptions here
            Log.e("CalendarModule", "Error creating calendar event: ${e.message}", e)
        }
    }

}
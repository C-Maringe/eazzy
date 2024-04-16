package com.eazzy;

import static com.vanstone.trans.api.PrinterApi.PrnStr_Api;

import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;

import com.vanstone.trans.api.PrinterApi;

import org.joda.time.DateTimeZone;
import org.joda.time.LocalDateTime;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.ref.WeakReference;
import java.text.DecimalFormat;

public class PrintReceipt extends AsyncTask<Void, Void, Void> {

    private JSONObject response;
    private String cardNumber;
    private boolean isMerchantCopy;
    private Resources resources;
    private int mTxnType = -1;
    private String mTxnTypeName = "";
    private String errorCase;
    private String mProductName;
    private String errorMessage;
    private WeakReference<TaskCompleteCallback> callbackWeakReference;
    private boolean mIsCompanyAccount;

    PrinterApi printerApi;


    public void setTaskCompleteCallback(TaskCompleteCallback completeCallback) {
        this.callbackWeakReference = new WeakReference<>(completeCallback);
    }

    public PrintReceipt(Resources resources, String errorCase, String errorMessage, String cardNumber) {
        this.resources = resources;
        this.errorCase = errorCase;
        this.errorMessage = errorMessage;
        this.cardNumber = cardNumber;


    }

    public PrintReceipt(Resources resources, int transactionType, JSONObject response, String cardNumber, boolean isMerchantCopy, boolean isSuccessful) {
        this.response = response;
        this.resources = resources;
        this.cardNumber = cardNumber;
        this.isMerchantCopy = isMerchantCopy;
        this.mTxnType = transactionType;

        // Initialize printerApi with resources

        printReceiptSale("mTxnTypeName");
    }

    private void printCentsAsMoney(double cents, String currency, String label){
        DecimalFormat format = new DecimalFormat("0.00");
        String am$ = currency + format.format(cents / 100);
        PrnStr_Api(justifiedText(32, label, am$));
    }

    private void printReceiptSale(String txnType) {
        printerApi = new PrinterApi();
        printerApi.PrnClrBuff_Api();
        printerApi.PrnFontSet_Api(24, 24, 0);
        printerApi.PrnSetGray_Api(6);
        printerApi.PrnLineSpaceSet_Api((short) 5, 0);

        Bitmap bitmap = BitmapFactory.decodeResource(resources, R.drawable.print_logo);
        printerApi.PrnLogo_Api(bitmap);


        printerApi.PrnStr_Api(centeredText("Eazzy Pay"));

        printerApi.PrnStr_Api(centeredText("Poscloud"));

        printerApi.PrnStr_Api(centeredText("Poscloud"));

        printerApi.PrnStr_Api(centeredText("Harare"));

        printerApi.PrnStr_Api("\n");

        String responseOperator = null;
        try {
            responseOperator = response.getString("operator");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        if (responseOperator == null || responseOperator.isEmpty()) {
//            printerApi.PrnStr_Api(justifiedText(32, "OPERATOR", App.sOperatorName));
        } else {
//            printerApi.PrnStr_Api(justifiedText(32, "OPERATOR", responseOperator));
        }


        printerApi.PrnStr_Api(justifiedText(32, "TERMINAL ID.", "123456789"));


        try {
            String dateTime = response.getString("datetime");
            String time = dateTime.substring(0, 9);
            String date = dateTime.substring(9);
            printerApi.PrnStr_Api(justifiedText(32, "DATE: " + date, "TIME: " + time));
        } catch (Exception e) {
            LocalDateTime dateTime = new LocalDateTime(DateTimeZone.forOffsetHours(2));
            String date = dateTime.toString().substring(0, 10);
            String time = dateTime.toString().substring(11, 20);
            printerApi.PrnStr_Api(justifiedText(32, "DATE: " + date, "TIME: " + time));
        }

        //Bigger text, card number
        try {
            if (cardNumber.length() > 0) {
                String cardNumberMasked = cardNumber.substring(0, 2) + "****" + cardNumber.substring(cardNumber.length() - 5);
                printerApi.PrnStr_Api(justifiedText(32, "Card #", cardNumber)); //card number unmasked
            }
            //printerApi.PrnStr_Api(justifiedText(32, "Card #", cardNumberMasked));
        } catch (Exception e) {
            e.printStackTrace();
        }

        printerApi.PrnStr_Api(justifiedText(32, txnType, mProductName));

        try {
            if (!response.get("currency").toString().equalsIgnoreCase("DSL"))
                if (!response.get("currency").toString().equalsIgnoreCase("PTL")) {
                    double total = response.getDouble("total_amount");
                    printCentsAsMoney(total, cardNumber.substring(0, 2), "AMOUNT");
                }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            printCentsAsMoney(response.getJSONObject("card").getDouble("deposit_amount"), cardNumber.substring(0, 2), "CARD BAL");
        } catch (JSONException e) {
            e.printStackTrace();
        }


        try {
            double total = response.getDouble("litres");
            printerApi.PrnStr_Api(justifiedText(32, "LITRES:", Double.toString(total)));
        } catch (JSONException e) {
            e.printStackTrace();
        }


        printerApi.PrnStr_Api("\n");


        printerApi.PrnStr_Api(centeredText(32, " SUCCESSFUL"));


        printerApi.PrnFontSet_Api(24, 24, 0);
        //printerApi.PrnStr_Api("\n");


        printerApi.PrnStr_Api(centeredText("Verified by PIN"));

        printerApi.PrnStr_Api("\n");

        printerApi.PrnFontSet_Api(32, 32, 0);

        boolean toto = false;
        try {
            toto = response.getBoolean("last_transaction");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (toto) {
            PrnStr_Api(centeredText(24, "DUPLICATE"));
        } else if (isMerchantCopy) {
            PrnStr_Api(centeredText(24, "MERCHANT COPY"));
        } else {
            PrnStr_Api(centeredText(24, "CUSTOMER COPY"));
        }

        printerApi.PrnStr_Api("\n");
        printerApi.PrnStr_Api("\n");
        printerApi.PrnStr_Api("\n");
        printerApi.PrnStr_Api("\n");
        printerApi.PrnStart_Api();
    }

    private String justifiedText(int totalRowLength, String text1, String text2) {
        String spaces = "";

        int countSpaces = Math.round(totalRowLength - (text1.length() + text2.length()));
        for (int i = 0; i < countSpaces; i++) {
            spaces = spaces.concat(" ");
        }
        return text1 + spaces + text2;
    }

    private String centeredText(String text) {
        return centeredText(32, text);
    }

    private String centeredText(int totalSpaces, String text) {
        String spaces = "";
        if (text == null) {
            return "";
        }
        int countSpaces = Math.round((totalSpaces - text.length()) / 2);
        for (int i = 0; i < countSpaces; i++) {
            spaces = spaces.concat(" ");
        }
        return spaces.concat(text);
    }

    @Override
    protected Void doInBackground(Void... voids) {
        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        super.onPostExecute(aVoid);
        try {
            callbackWeakReference.get().onPrintTaskComplete();
        } catch (Exception ignore) {

        }
    }

    public interface TaskCompleteCallback {
        void onPrintTaskComplete();
    }
}

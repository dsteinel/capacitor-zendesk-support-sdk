package com.sencrop.capacitor.zendeskchat;

import android.content.Context;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import java.util.Locale;

import zendesk.core.AnonymousIdentity;
import zendesk.core.Zendesk;
import zendesk.support.Support;
import zendesk.support.guide.HelpCenterActivity;
import zendesk.support.request.RequestActivity;
import zendesk.support.requestlist.RequestListActivity;
import zendesk.support.SupportEngine;
import zendesk.classic.messaging.MessagingActivity;

@CapacitorPlugin(name = "ZendeskChat")
public class ZendeskChat extends Plugin {
    @PluginMethod()
    public void initialize(PluginCall call) {
        String appId = call.getString("appId");
        String clientId = call.getString("clientId");
        String zendeskUrl = call.getString("zendeskUrl");

        if (appId == null || clientId == null || zendeskUrl == null) {
            call.reject("Missing appId, clientId or zendeskUrl");
            return;
        }

        Context context = getContext();
        Zendesk.INSTANCE.init(context, zendeskUrl, appId, clientId);
        Support.INSTANCE.init(Zendesk.INSTANCE);

        if (call.hasOption("theme")) {
            // Theme customization is handled in setTheme
            setTheme(call);
        }

        if (call.hasOption("locale")) {
            setLocale(call);
        }

        call.resolve();
    }

    @PluginMethod()
    public void setTheme(PluginCall call) {
        // For the Unified/Classic SDK on Android, theme customization is primarily done via XML styles.
        // Programmatic color adjustment is not directly supported by the Zendesk Support SDK activities.
        // We log this as a reminder that XML styles should be used for Android branding.
        String primaryColor = call.getString("primaryColor");
        if (primaryColor != null) {
            android.util.Log.w("ZendeskChat", "setTheme: Programmatic primaryColor customization is not supported on Android Unified SDK. Please use XML styles.");
        }
        call.resolve();
    }

    @PluginMethod()
    public void setLocale(PluginCall call) {
        String localeString = call.getString("locale");
        if (localeString != null) {
            Locale locale = Locale.forLanguageTag(localeString);
            Support.INSTANCE.setHelpCenterLocaleOverride(locale);
        }
        call.resolve();
    }

    @PluginMethod()
    public void setVisitorInfo(PluginCall call) {
        String name = call.getString("name");
        String email = call.getString("email");

        // Identity for Support SDK
        Zendesk.INSTANCE.setIdentity(new AnonymousIdentity.Builder()
                .withNameIdentifier(name)
                .withEmailIdentifier(email)
                .build());

        call.resolve();
    }

    @PluginMethod()
    public void open(PluginCall call) {
        // Opens the Unified Messaging UI with Support Engine
        MessagingActivity.builder()
            .withEngines(SupportEngine.engine())
            .show(getContext());
        call.resolve();
    }

    @PluginMethod()
    public void openHelpCenter(PluginCall call) {
        HelpCenterActivity.builder()
                .show(getContext());
        call.resolve();
    }

    @PluginMethod()
    public void openTicketList(PluginCall call) {
        RequestListActivity.builder()
                .show(getContext());
        call.resolve();
    }

    @PluginMethod()
    public void createTicket(PluginCall call) {
        RequestActivity.builder()
                .show(getContext());
        call.resolve();
    }
}

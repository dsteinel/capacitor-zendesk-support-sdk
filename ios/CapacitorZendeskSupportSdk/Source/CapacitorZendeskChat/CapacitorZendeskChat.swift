import Foundation
import Capacitor
import ZendeskCoreSDK
import SupportSDK
import ChatSDK
import MessagingSDK

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 */
@objc(ZendeskChat)
public class ZendeskChat: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ZendeskChat"
    public let jsName = "ZendeskChat"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setVisitorInfo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "open", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openHelpCenter", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openTicketList", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createTicket", returnType: CAPPluginReturnPromise)
    ]

    @objc func initialize(_ call: CAPPluginCall) {
        guard let appId = call.getString("appId"),
              let clientId = call.getString("clientId"),
              let zendeskUrl = call.getString("zendeskUrl") else {
            call.reject("Missing appId, clientId or zendeskUrl")
            return
        }

        DispatchQueue.main.async {
            ZendeskCoreSDK.Zendesk.initialize(appId: appId, clientId: clientId, zendeskUrl: zendeskUrl)
            SupportSDK.Support.initialize(withZendesk: ZendeskCoreSDK.Zendesk.instance)
            call.resolve()
        }
    }

    @objc func setVisitorInfo(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let name = call.getString("name") ?? ""
            let email = call.getString("email") ?? ""

            // Identity for Support SDK
            let identity = ZendeskCoreSDK.Identity.createAnonymous(name: name, email: email)
            ZendeskCoreSDK.Zendesk.instance?.setIdentity(identity)
            
            call.resolve()
        }
    }

    @objc func open(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            do {
                let supportEngine = try SupportSDK.SupportEngine.engine()
                let viewController = try MessagingSDK.Messaging.instance.buildUI(engines: [supportEngine], configs: [])
                let navigationController = UINavigationController(rootViewController: viewController)
                self.bridge?.viewController?.present(navigationController, animated: true, completion: nil)
                call.resolve()
            } catch {
                call.reject("Could not create messaging UI")
            }
        }
    }

    @objc func openHelpCenter(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let helpCenterUiConfig = SupportSDK.HelpCenterUiConfiguration()
            let viewController = SupportSDK.HelpCenterUi.buildHelpCenterOverviewUi(withConfigs: [helpCenterUiConfig])
            let navigationController = UINavigationController(rootViewController: viewController)
            self.bridge?.viewController?.present(navigationController, animated: true, completion: nil)
            call.resolve()
        }
    }

    @objc func openTicketList(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let viewController = SupportSDK.RequestUi.buildRequestList(with: [])
            let navigationController = UINavigationController(rootViewController: viewController)
            self.bridge?.viewController?.present(navigationController, animated: true, completion: nil)
            call.resolve()
        }
    }

    @objc func createTicket(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let viewController = SupportSDK.RequestUi.buildRequestUi(with: [])
            let navigationController = UINavigationController(rootViewController: viewController)
            self.bridge?.viewController?.present(navigationController, animated: true, completion: nil)
            call.resolve()
        }
    }
}

// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorZendeskChat",
    platforms: [
        .iOS(.v15)
    ],
    products: [
        .library(
            name: "CapacitorZendeskChat",
            targets: ["CapacitorZendeskChat", "CapacitorZendeskChatObjc"]
        ),
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0"),
        .package(url: "https://github.com/zendesk/support_sdk_ios", from: "9.3.0"),
        .package(url: "https://github.com/zendesk/chat_sdk_ios", from: "5.0.8"),
        .package(url: "https://github.com/zendesk/messaging_sdk_ios", from: "6.3.0")
    ],
    targets: [
        .target(
            name: "CapacitorZendeskChat",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "ZendeskSupportSDK", package: "support_sdk_ios"),
                .product(name: "ZendeskChatSDK", package: "chat_sdk_ios"),
                .product(name: "ZendeskMessagingSDK", package: "messaging_sdk_ios")
            ],
            path: "ios/CapacitorZendeskChat/Source/CapacitorZendeskChat"
        ),
        .target(
            name: "CapacitorZendeskChatObjc",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                "CapacitorZendeskChat"
            ],
            path: "ios/CapacitorZendeskChat/Source/CapacitorZendeskChatObjc",
            publicHeadersPath: "."
        )
    ]
)

//
//  RNMultiSwitchSelectorModule.swift
//  RNMultiSwitchSelectorModule
//
//  Copyright © 2022 Anton Kurtin. All rights reserved.
//

import Foundation

@objc(RNMultiSwitchSelectorModule)
class RNMultiSwitchSelectorModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

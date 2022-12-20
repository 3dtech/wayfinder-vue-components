# 3D Wayfinder Vue2 components

[WFAlphabetMenu](#WFAlphabetMenu)

[WFAZMenu](#WFAZMenu)

[WFBanner](#WFBanner)

[WFBuildingLogo](#WFBuildingLogo)

[WFFilteredMenu](#WFFilteredMenu)

[WFFlagsMenu](#WFFlagsMenu)

[WFMapFloors](#WFMapFloors)

[WFGroupPOIsMenu](#WFGroupPOIsMenu)

[WFGroupsMenu](#WFGroupsMenu)

[WFGroup](#WFGroup)

[WFhtml](#WFhtml)

[WFhtml](#WFhtml)

[WFPage](#WFPage)

[WFPOI](#WFPOI)

[WFLanguagesMenu](#WFLanguagesMenu)

[WFMap](#WFMap)

[WFPageMenu](#WFPageMenu)

[WFMapFloors](#WFMapFloors)

[WFScrollableArea](#WFScrollableArea)

[WFSearch](#WFSearch)

[WFShortcutsMenu](#WFShortcutsMenu)

[WFGroupsMenu](#WFGroupsMenu)

[WFTab](#WFTab)

[WFTabs](#WFTabs)

[WFTabs](#WFTabs)

[WFYAH](#WFYAH)

[WFZoomMenu](#WFZoomMenu)

---

## [WFAlphabetMenu](#WFAlphabetMenu) 




### Properties


 - pois : array ([])
 - override-char : string ("")
 - show-in-menu : boolean (true)

### Events


 - clicked (letter: unknown,letter: unknown)

## [WFAZMenu](#WFAZMenu) 




### Properties


 - show-logo : boolean (false)
 - show-name : boolean (true)
 - show-path-button : boolean (false)
 - show-description : boolean (false)
 - show-room-id : boolean (false)
 - show-floor : boolean (false)
 - current-poi : object (null)

### Slots


 - default - 

## [WFBanner](#WFBanner) 




### Properties


 - template : string (undefined)
 - container : string (undefined)
 - play-on-boot : boolean (false)
 - qr-url : string ("https://3dwayfinder.com")

### Events


 - hasbanners (this.frames.length > 0: binary)
 - clicked (frame: unknown,container: unknown)

### Slots


 - default - 

## [WFBuildingLogo](#WFBuildingLogo) 




## [WFFilteredMenu](#WFFilteredMenu) 




### Properties


 - show-logo : boolean (false)
 - show-name : boolean (true)
 - show-path-button : boolean (false)
 - show-description : boolean (false)
 - show-room-id : boolean (false)
 - show-floor : boolean (false)
 - current-poi : object (null)

### Slots


 - default - 

## [WFFlagsMenu](#WFFlagsMenu) 




### Properties


 - show-title : boolean (true)
 - show-flag : boolean (true)
 - label-type : string ("none")

### Events


 - change-language (language: unknown)

## [WFMapFloors](#WFMapFloors) 




### Properties


 - show-poicount : boolean (false)
 - current-floor : object (null)
 - hide-when-single-floor : boolean (true)

### Events


 - clicked (floor: unknown)

## [WFGroupPOIsMenu](#WFGroupPOIsMenu) 




### Properties


 - group : object (null)
 - current-poi : object (null)

## [WFGroupsMenu](#WFGroupsMenu) 




### Properties


 - current-group : object (null)
 - parent : number (-1)
 - show-poicount : boolean (false)
 - az : boolean (false)
 - order : boolean (false)
 - show-icon : boolean (false)
 - show-sub-groups : boolean (true)
 - show-pois : boolean (false)
 - show-poilogo : boolean (false)
 - show-poiname : boolean (true)
 - show-poipath-button : boolean (false)
 - show-poidescription : boolean (false)
 - show-poiroom-id : boolean (false)
 - show-poifloor : boolean (false)
 - open-group : boolean (true)
 - sort-pois : boolean (true)

### Events


 - poi-clicked (poi: unknown)

### Slots


 - prepend - 
 - default - 
 - poi - 
 - append - 

## [WFGroup](#WFGroup) 




### Properties


 - group : object (null)
 - show-icon : boolean (false)
 - show-poicount : boolean (false)

## [WFhtml](#WFhtml) 




### Properties


 - item : object (null)

## [WFhtml](#WFhtml) 




### Properties


 - item : object (null)

## [WFPage](#WFPage) 




### Properties


 - container : string ("default")
 - index : number (-1)
 - slug : string (null)
 - show-name : boolean (true)
 - play-all : boolean (false)
 - duration : number (30)

## [WFPOI](#WFPOI) 




### Properties


 - poi : object (null)
 - show-logo : boolean (false)
 - show-name : boolean (true)
 - show-path-button : boolean (false)
 - show-description : boolean (false)
 - show-room-id : boolean (false)
 - show-floor : boolean (false)

### Events


 - show-path (poi: object)

## [WFLanguagesMenu](#WFLanguagesMenu) 




### Properties


 - show-title : boolean (false)
 - show-flag : boolean (true)
 - label-type : string ("none")
 - hide-active : boolean (false)
 - title : string ("Select language")

### Events


 - change (language: unknown)

## [WFMap](#WFMap) 




### Properties


 - project : string (undefined)
 - api : string ("//api.3dwayfinder.com/")
 - assets : string ("//static.3dwayfinder.com/shared/")
 - show-path-text : boolean (true)

## [WFPageMenu](#WFPageMenu) 




### Properties


 - container : string ("default")
 - show-icon : boolean (false)
 - show-name : boolean (true)
 - current-page : object (null)
 - sort-az : boolean (false)

## [WFMapFloors](#WFMapFloors) 




### Properties


 - src : string ("")
 - reset-page : boolean (false)

## [WFScrollableArea](#WFScrollableArea) 




### Slots


 - default - 

## [WFSearch](#WFSearch) 




### Properties


 - limit : number (-1)
 - show-close-button : boolean (false)
 - show-output-field : boolean (true)
 - show-keyboard : boolean (true)
 - show-no-results-text : boolean (true)
 - no-results-text : string ("No results")
 - show-logo : boolean (false)
 - show-name : boolean (true)
 - show-path-button : boolean (false)
 - show-description : boolean (false)
 - show-room-id : boolean (false)
 - show-floor : boolean (false)
 - current-poi : object (null)

### Events


 - clicked (poi: unknown)
 - close ()

### Slots


 - default - 

## [WFShortcutsMenu](#WFShortcutsMenu) 




### Properties


 - show-label : boolean (true)
 - show-path : boolean (true)
 - show-icon : boolean (true)
 - highlight : boolean (true)
 - dehighlight-overlay : boolean (false)

### Events


 - clicked (nearest: unknown,shortcut: unknown)

## [WFGroupsMenu](#WFGroupsMenu) 




### Properties


 - parent : number (-1)
 - show-poicount : boolean (false)
 - az : boolean (false)
 - order : boolean (false)
 - show-icon : boolean (false)
 - show-sub-groups : boolean (true)
 - show-pois : boolean (false)
 - show-poilogo : boolean (false)
 - show-poiname : boolean (true)
 - show-poipath-button : boolean (false)
 - show-poidescription : boolean (false)
 - show-poiroom-id : boolean (false)
 - show-poifloor : boolean (false)
 - open-group : boolean (true)
 - sort-pois : boolean (true)

### Slots


 - default - 
 - poi - 

## [WFTab](#WFTab) 




### Properties


 - name : string (undefined)

### Slots


 - default - 

## [WFTabs](#WFTabs) 




### Events


 - switch-tab (tab: unknown)

## [WFTabs](#WFTabs) 




### Properties


 - active-tab : string (undefined)
 - animate : string ("none")

### Events


 - tab-changed (tab: unknown)

### Slots


 - default - 

## [WFYAH](#WFYAH) 




## [WFZoomMenu](#WFZoomMenu) 




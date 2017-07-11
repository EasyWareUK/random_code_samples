accedo.Class.create("app.controllers.mainController", "accedo.ui.Controller", ["app.views.loveLiveView"],{},
    {
        initialize: function($super) {
            $super();
        
            this.setView(app.views.loveLiveView);
        },
        
        setup: function(context) {
            this.setOption('defaultFocus', 'startMenu'); //first focussed page ....
            this.startMenu = this.get('startMenu');

            
            this.mainMenuPanel = this.get('mainMenuPanel');
            this.mainMenu = this.get('mainMenu');
            this.mainMenuScrollbar = this.get('mainMenuScrollbar');
            //this.mainMenu.setScrollbar(this.mainMenuScrollbar);
            this.ds = new accedo.data.Ds(); 

   
            //on Full screen controller back
            if (context && context.currentSubctrl) {
            
                //check to see if this controller is loaded from cache
                if (this.startMenu.getChildren()[0].getDefinition() == context.currentSubctrl){
                    this.startMenu.getChildren()[0].updateVideoWindow();
                }
                //else if re-initialized
                else {
                    this.startMenu.getChildren()[0].navigate(context.currentSubctrl, {}, {
                        noHistory: true
                    });
                }
            }

            accedo.Fn.delay(function(){
                accedo.ui.ctrlr.Loading.close();
            }, 0.5);
            

        },
 
 
        
        reset: function() {

        },
        getContext: function() {
            return {
                currentSubctrl: this.startMenu.getChildren()[0].getDefinition()
            }
        },
        onKey: function(vKey) {
            accedo.console.log("Key bubble for " + this.getDefinition() + " of key:" + vKey);
            switch(vKey) {
                case accedo.VKey.KEY_BACK:
                    //checks if there're history
                    var historyMgr = this.getRootController().getHistoryManager();
                    if (historyMgr && historyMgr.getHistoryStack().length==0) {
                        accedo.device.system.exit({
                            toInternetTV:true
                        });
                        accedo.console.log("Main Controller got return key!");
                        return true; // signal key already handled
                    }
                    return false; // history exists, let default action happen
                case accedo.VKey.KEY_EXIT:
                    accedo.console.warn("Just saw exit key!!!");
                    var confirmWidget = new app.widget.Confirm({
                        text: "Confirm to exit",
                        headerText: "Are you sure to exit the App?",
                        cancelButtonText: "Cancel",
                        confirmButtonText: "Confirm",
                        width: "960px",
                        height: "540px",
                        left: "140px",
                        top: "110px",
                        dialog_width: "680px",
                        dialog_height: "320px"
                    });

                    confirmWidget.addEventListener(accedo.ui.Evt.CONFIRM, function(){
                        accedo.device.system.exit();
                        confirmWidget.removeAllListeners();
                    },this);

                    return true; // return true to dis-allow default action to happen
            }
        },
        onKeyCapture: function(vKey) {
            accedo.console.debug("Key capture for " + this.getDefinition() + " of key:" + vKey);
            return false;
        }
    });
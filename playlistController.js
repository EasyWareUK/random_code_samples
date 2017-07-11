accedo.Class.create("app.controllers.playlistController", "accedo.ui.Controller", ["app.views.playlistView"],{},{  //PlaylistController
    listReady : false,
    initialize: function($super) {
        $super();

        this.setView(app.views.playlistView);
    },

    setup: function(context) {
	    
	    if(this.listReady)
	    {
		    this.updateCurrentTime();
        	this.updateVideoWindow();
	    	return;
    	}
	    	
    	this.playUrl = null;
    	this.currId = 1;
    	this.nextTime = {"idx":-1, "time":-1};
    	
        this.mediaList = this.get('mediaList');
        this.smallTimer = this.get('smallTimer');
        this.fullscreenBtn = this.get('fullscreenBtn');
        this.fullscreenBtn.removeClass("accedo-ui-button"); 
        
        this.smallBackSkip = this.get('smallBackSkip');
        this.smallBackSkip.removeClass("accedo-ui-button");
        this.smallRewind = this.get('smallRewind');
        this.smallRewind.removeClass("accedo-ui-button");
        this.smallPause = this.get('smallPause');
        this.smallPause.removeClass("accedo-ui-button");
        this.smallFF = this.get('smallFF');
        this.smallFF.removeClass("accedo-ui-button");
        this.smallForwardSkip = this.get('smallForwardSkip');
        this.smallForwardSkip.removeClass("accedo-ui-button");
        
        this.playlistTitle = this.get('playlistTitle');  
        this.back_img = this.get('back_img');
        this.currPlayTitle = this.get('currPlayTitle');
        
        this.timeline = this.get('timeline');
        this.timeline1 = this.get('timeline1');
        this.timeline2 = this.get('timeline2');
        //this.lblCurrentTime = this.get('currentTime');
        this.playlistEvent = this.get('playlistEvent');
        this.eventDescr = this.get('eventDescr');
        this.eventInfo = this.get('eventInfo');

    
        this.getData(accedo.device.storage.get('playlistAssetId'));
        this.playlistTitle.setText(accedo.device.storage.get('playlistOwner') + " &nbsp; > &nbsp; ");
        this.playlistEvent.setText(accedo.device.storage.get('playlistEvent'));
        this.eventDescr.setText(accedo.device.storage.get('playlisteventDescr'));
        this.eventInfo.setText(accedo.device.storage.get('playlisteventInfo'));

        this.updateCurrentTime();
        this.updateVideoWindow();
            
        var self = this;

        if(!this.listReady){
            this.mediaList.setDisplayHelper(function(components, data) {
                components.setText(data.title);

                components.removeClass("accedo-ui-button");
                components.removeClass("accedo-ui-label");
                components.removeClass("accedo-ui-layout-linear-element");
                components.removeClass("accedo-ui-layout-linear-element.selected");

                components.addClass("playlistMenuBtn");
                components.getChildren()[0].addClass("playlistMenuItem");

                components.addEventListener(accedo.ui.Evt.CLICK, function() {
                    if(!accedo.Object.isUndefined(data.opts) && !accedo.Object.isUndefined(data.opts.type)){
                        app.Playback.currentType = data.opts.type;
                    }else{
                        app.Playback.currentType = "video";
                    }
                    self.currId = this.getSelectedIndex();
                    if (self.currId < this.getCurrentSize()-1)
                    {
	                    nextData = this._datasource.getDataAtIndex(self.currId+1);
	                    self.nextTime.idx = self.currId+1;
	                    self.nextTime.time = nextData.time;
                    }
                    else
                    {
	                    self.nextTime.idx = -1;
	                    self.nextTime.time = -1;
                    }
                    console.log("this.nextTime.time = " + self.nextTime.time);
                    self.currPlayTitle.setText(components.getText()); 
                    accedo.device.video.setPlayerTime(data.time);
                }, this);
            });
        }

        this.mediaList.addEventListener(accedo.ui.AbstractComponent.EVT_KEY, function(vKey) {
            switch (vKey) {
                case accedo.VKey.KEY_OK:
                    this.mediaList._onClick();
                    break;
            }
        }, this);
            
        
        
         this.smallPause.addEventListener(accedo.ui.Evt.CLICK, function(){
	         //accedo.device.video.speed(1); //in case we were FF or rewinding....
	         accedo.Env.dispatchEvent(accedo.Env.EVT_ONKEY, accedo.VKey.KEY_PLAY_PAUSE, this); 
	         /*
	         console.log("++++++++ accedo.device.video.state = " + accedo.device.video.state);
	         console.log("++++++++ accedo.device.video.PLAYING = " + accedo.device.video.PLAYING);
	         accedo.device.video.speed(1); //in case we were FF or rewinding....
            if(accedo.device.video.state === accedo.device.video.PAUSED)
                accedo.device.video.resume();
            else
                accedo.device.video.pause();
                
                */
           }, this);

                      
        this.smallRewind.addEventListener(accedo.ui.Evt.CLICK, function(){
	        accedo.Env.dispatchEvent(accedo.Env.EVT_ONKEY, accedo.VKey.KEY_RW, this); 
           }, this);
           

          this.smallFF.addEventListener(accedo.ui.Evt.CLICK, function(){
	          accedo.Env.dispatchEvent(accedo.Env.EVT_ONKEY, accedo.VKey.KEY_FF, this); 
            }, this);
            
            
            this.smallBackSkip.addEventListener(accedo.ui.Evt.CLICK, function(){
	            this.skipBackward();
            }, this);
        
            this.smallForwardSkip.addEventListener(accedo.ui.Evt.CLICK, function(){
	            this.skipForward();
            }, this);
 
       
        
	    this.fullscreenBtn.addEventListener(accedo.ui.Evt.CLICK, function() { 
             accedo.ui.AppController.singleton().changeToController('fullScreen',{},false);
        }, this);
                
        
        this.back_img.addEventListener(accedo.ui.Evt.KEY, function(evKey) {
            switch (evKey) {
                case accedo.VKey.KEY_OK:
                    this.goBack();
                    break;
            }
        }, this);


		this.back_img.addEventListener(accedo.ui.Evt.CLICK, function(){
		     		this.goBack();
	            	}, this);
	            	
        
        accedo.ui.ctrlr.Loading.close();
        
        app.controllers.playlistController.__defaults.mediaList = this.mediaList;
        app.controllers.playlistController.__defaults.currPlayTitle = this.currPlayTitle;
    },


    skipForward: function(){
		if(++this.currId > mediaList.length-1)
	    	this.currId = 1; //0 is watch full concert!!!
		this.selectTrack(this.currId);    
    },


    skipBackward: function(){
        if(--this.currId < 1) //0 is watch full concert!!!
          	this.currId = mediaList.length-1; 
        this.selectTrack(this.currId);
    },
    
	            
    getData: function (theAssetId) {
        var api = new app.model.Api();
        api.ooyalaReq(this, "ooyalarequest.php?assetId=" + theAssetId);  
    },
    
    loadData: function (response) {
	    var data = response.responseJSON;
        //console.log("Ooyala data.length: " + data.length);
        //showObj(data);
					
		for (i=0; i<data.length && i<8; i++)
		{
			if(data[i].video_width=1280  && data[i].profile != "high")
			{
				playUrl = data[i].url;
				//TEST ONLY. TO REMOVE!!!!!:
				//playUrl = accedo.config.get('app.codepath', '') + "../../accedo/DOcJ-FxaFrRg4gtDEwOmk2OjBrO6qGv_.mp4";

				var playlistData = [{title: "> Watch full concert", time: 0},];

				var trackJSON = JSON.parse(accedo.device.storage.get('playlist'));
				if (trackJSON!= null && trackJSON!= "undefined")
				{
					for(j=0; j<trackJSON.length; j++)
					{
						playlistData.push(trackJSON[j]);
						
						if (j==1)
						{
		                    this.nextTime.idx = j+1;
		                    this.nextTime.time = trackJSON[j].time;
						}
					}
				}
				console.log("The stream URL is: " + playUrl); 

				var ds = new accedo.data.Ds();
				ds.appendData(playlistData);
				this.mediaList.setDatasource(ds);
				this.listReady = true; 

				break;
			}
		}
		

        app.Playback.playVideo(playUrl,""); //Do data.opts!!!! 
		//this.selectTrack(1);
		this.mediaList.setSelectedIndex(1);
	    this.mediaList.getChildren()[1].setFocus();
	    this.currPlayTitle.setText(this.mediaList.getChildren()[1].getText()); 

        accedo.ui.ctrlr.Loading.close();
    },



    selectTrack: function(idx) {
	    this.mediaList.setSelectedIndex(idx);
	    //this.mediaList.getChildren()[idx].setActive();
	    this.mediaList.getChildren()[idx].setFocus();
	    this.mediaList.getChildren()[idx].dispatchEvent(accedo.ui.Evt.CLICK);
    },
    
    
    goBack: function() {
	    accedo.device.video.stop();
	    
	    var historyMgr = this.getRootController().getHistoryManager();
        if (historyMgr)
			historyMgr.historyBack();
    },
    
     clearAllSata: function() {
        this.playlistTitle.setText("");
        this.playlistEvent.setText("");
        this.eventDescr.setText("");
        this.eventInfo.setText("");
    },
    
    reset: function() {
        accedo.device.video.setFullscreen();
	    /*
        this.mediaList.removeAllListeners();
        this.back_img.removeAllListeners();
        for (x=0; x<this.mediaList.getChildren().length; x++)
        {
	        console.log("*********MEDIALIST CHILD: " + x);
	        this.mediaList.getChildren()[x].removeAllListeners();
        }
        this.clearAllSata();
        */
    },


    updateVideoWindow: function() {
        app.Playback.picInPic();
        accedo.device.video.setWindowSize({
                left: 75,
                top: 180,
                width: 427,
                height: 240
            });
    },
    
	
        
    updateCurrentTime: function() {
        var time = accedo.device.video.getCurrentTime && accedo.device.video.getCurrentTime(true);
        if (time) {
            this.smallTimer.setText(accedo.String.toHMMSS(time));
        }
        accedo.device.video.onSetCurTime = accedo.Fn.bind(function (time, formattedTime, percentage) {
	        
            this.timeline2.update(percentage); 
            this.smallTimer.setText(formattedTime);
            
            if (percentage==100)
            	this.currPlayTitle.setText("");
            
	        if (Math.floor(time) == this.nextTime.time)
	        {
		        this.selectTrack(this.nextTime.idx);
	        }
        }, this);
    },
    
    
    

    
    onKey: function(vKey) {
            if(vKey == accedo.VKey.KEY_BACK) 
            {
				this.goBack();
                return true; // signal key already handled
            }
            else if (vKey == accedo.VKey.KEY_NEXT)
            {
	            this.skipForward();
	         	return true; //key handled. Nt working as expected???   
            }
            else if (vKey == accedo.VKey.KEY_PREV)
            {
	            this.skipBackward();
	         	return true;   
            }
            return false;
        }



});

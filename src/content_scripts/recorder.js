function ScreenRecorder () {
    this.recording = false;
    this.events = [];

}

ScreenRecorder.prototype.toggleRecording = function () {
    if (!this.recording) {
        modal.show();
    }
    else {
        this.recording = false;
        browser.runtime.sendMessage({"message": "stop"});

    }
}

ScreenRecorder.prototype.startRecording = function () {
    this.events = [];
    this.recording = true;
    this.screencastId = Math.random().toString(36).substring(2, 15) + "-" + Date.now();
    browser.runtime.sendMessage({"message": "start"});
}

ScreenRecorder.prototype.setUp = function () {
    const me = this;
    rrweb.record({
        emit(event) {
            if (me.recording) {
                me.events.push(event);
            }
        },
    });

// this function will send events to the backend and reset the events array
    function save() {
        if (me.events.length > 0) {
            console.log('events pushed:', me.events);
            browser.runtime.sendMessage({"message":"save", "data":{"events": me.events, "screencastName": me.screencastName, "id": me.screencastId}});
            me.events = [];
        }
    }
    setInterval(save, 5 * 1000);
}

var screenRecorder = new ScreenRecorder();
var modal = new RecorderModal(screenRecorder);
screenRecorder.setUp();

browser.runtime.onMessage.addListener((request, sender) => {
    screenRecorder.toggleRecording();
});


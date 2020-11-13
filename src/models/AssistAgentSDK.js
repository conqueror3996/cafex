class CallManager {
    init = (param) => {};
    configureStartCall = () => {};
    configureEndCall = (a) => {};
    setRemoteVideoElement = (elem) => {};
    setLocalVideoElement = (elem) => {};
    setCallQualityIndicator = (elem) => {};
}
class CallManagerConfig {
    sessionToken = '' ;
    /**
     * Provide this in co-browse-only sessions to allow the server to associate
     * the Live Assist session with an existing call (see the Starting
     * a Co-browse only Session section on page 24).
     */
    correlationId = null ;
    /**
     * The URL of the Live Assist server. This is optional; Live Assist
     * will attempt to determine this value automatically if it is omitted ; but
     * may not be able to do so with some configurations ; such as with
     * some reverse proxies.
     */
    url=null ;
    /**
     * Set to true to automatically answer an incoming call. Defaults to
     * false. Only relevant to voice and video sessions.
     */
    autoanswer=null ;
    /**
     * Login details of the agent with the server
     */
    username=null ;
    /**
     * Login details of the agent with the server
     */
    password=null ;
    /**
     * A display name for the agent which will be presented to the consumer
     */
    agentName=null ;
    /**
     * The i18n locale to use for any UI elements (see the Internationalization section on page 23).
     */
    locale=null ;
    /**
     * Used for WebSocket connection control. See the Connection Callbacks section on page 46
     */
    connectionStatusCallbacks = new class {
        /**
         * Called for the initial WebSocket failure ; and for every failed reconnection attempt
         * (including the last one).
         * This method is called regardless of whether retryIntervals is specified (that is ;
         * whether automatic reconnections are attempted or not).
         * The connector object allows the implementing class to ‘take control’ of reconnecting ;
         * even if reconnection is automatic. For example ; an application might decide
         * to give up reconnection attempts even if more reconnection events would subsequently
         * occur ; or to try the next reconnection attempt immediately and not wait
         * until the next retry interval has passed.
         */
        onDisconnect = (error, connector) => {};
        /**
         * Called when a reconnection attempt succeeds.
         * This may be useful to clear an error in the application ; or for canceling reconnection
         * attempts if the application is managing its own reconnections.
         */
        onConnect = () => {};
        /**
         * Called under the following conditions:
         * ・ when all reconnection attempts have been made (and failed); or
         * ・ when either the connector.disconnect or AssistSDK.endSupport method is called.
         */
        onTerminated = (error) => {};;
        /**
         * Called under the following conditions:
         * ・ when the WebSocket connection is lost; or
         * ・ when a reconnection attempt fails and automatic reconnections are occurring
         * (retryIntervals is a non-empty array) and there are more automatic reconnection
         * attempts to be made.
         * This method is called after the onDisconnect method.
         * Use the connector to override reconnection behavior. For example ; a reconnect
         * attempt could be made straight away.
         */
        willRetry = (inSeconds, retryAttemptNumber, maxRetryAttempts, connector) => {};
    } ;
    /**
     * default [1.0 ;2.0 ;4.0 ;8.0 ;16.0 ;32.0]
     * Used for WebSocket connection control. See the Connection Configuration section on page 45.
     * Array of numeric values. The number of values
     * indicates the number of reconnection
     * attempts ; and the values indicates the time
     * in seconds between each attempt. If an
     * empty array is specified ; then no reconnection
     * attempts will be made.
     */
    retryIntervals= null ;
    /**
     * If not set ; or set to true ; the consumer's mouse pointer will be shadowed
     * to the agent's screen. Set to false to turn off the shadow
     * cursor for the session. See the the Shadow Cursor section on page 15.
     */
    shadowCursor= null ;
    /**
     * Live Assist updates the shadow cursor on the agent's screen every
     * second by default. Set this to a new value in milliseconds to change
     * the update frequency.
     */
    shadowCursorDelay=null ;
}
const CafexErrorDto = {
    code: null ,
    message: null
}
class Connector{
    reconnect = () => {};
    terminate = () => {};
}
class AssistAgent {
    sdkUrl = '';
    setRemoteView;
    setConnectionLostCallback = (callback= () => {}) => {};
    setConnectionEstablishedCallback = (callback= () => {}) => {};
    setRemoteViewCallBack = (callback= (width, height) => {}) => {};
    /**
     * 0 Produced by the CallManager when it is unable to initialize the FCSDK objects
     * 1-4 Reserved
     * 5 An attempt has been made to start a support session when one is already in progress
     * 6 Produced by the CallManager when it is unable to make a call. The message element gives more information
     * 7 Produced when there is an attempt to fill in a form ; and AssistAgentSDK.setFormCallback has not been called.
     * @param callback 
     */
    ERROR_CODE = {
        CONNECTION_LOST: null ,
        PERMISSION: null ,
        SOCKET: null ,
        CALL_FAIL: null ,
        POPUP: null ,
        SESSION_IN_PROGRESS: null ,
        SESSION_CREATION_FAILURE: null ,
        UNDEFINED_FUNCTION: null
    } ;
    remoteViewSizeChanged = (newX, newY) => {};
    setZoomStartedCallback = (zoomStartedCallback= () => {}) => {};
    setZoomEndedCallback = (zoomStartedCallback= () => {}) => {};
    setConnectionRetryCallback = (connectionRetryCallback= () => {}) => {};
    setConnectionReestablishedCallback = (connectionReestablishedCallback= () => {}) => {};
    setError = (error) => {};
    joinSnapshotTopic = () => {};
    setSnapshotCallBack = (newSnapshotCallBack= () => {}) => {};
    setScreenShareActiveCallback = (screenShareActiveCallback = (active) => {}) => {};
    setScreenShareRejectedCallback = (screenShareRejectedCallback= () => {}) => {};
    //Set callback for when the consumer has joined the root topic
    setConsumerJoinedCallback = (consumerJoinedCallback= () => {}) => {};
    //Set the callback for when the consumer has left the root topic
    setConsumerLeftCallback = (consumerLeftCallback= () => {}) => {};
    setConsumerEndedSupportCallback = (callback = () => {}) => {};
    setCallEndedCallback = (callEndedCallback = () => {}) => {};
    setOnErrorCallback = (onErrorCallback = (error) => {}) => {};
    setFormCallBack = (newFormCallBack = (formElement) => {}) => {};
    setConsumerCursorCallback = (move) => {};
    setConsumerCursorCallbacks = (consumerCursorCallbacks = () => {}) => {};
    sendNewFormCallback = (element) => {};
    joinFormTopic = () => {};
    OffAssistPagesException = (message) => {};
    DrawStyleArgumentException = (message) => {};
    drawSelected = () => {};
    controlSelected = () => {};
    spotlightSelected = () => {};
    clearSelected = () => {};
    clearShareView = () => {};
    endSupport = () => {};
    pushDocument = (docUrl, eventHandler, docMetadata) => {};
    pushContent = (docUrl, eventHandler, docMetadata) => {};
    closeDocument = (sharedDocId) => {};
    isSharedDocumentOpen = () => {};
    sendRootTopicMessage = (requestMessage) => {};
    requestScreenShare = () => {};
    pushLink = (linkUrl) => {};
    init = (configuration) => {};
    validateAgentDrawStyle = (stroke, strokeOpacity, strokeWidth) => {};
    isValidColour = (str) => {};
    isValidConsumerCursorLabel = (label) => {};
    connectWebSocket = (configuration) => {};
    // TODO this seems entirely redundant since we rejected the call already... Figure out why it's here...
    rejectSupport = (configuration) => {};
    setAgentDrawStyle = (stroke, strokeOpacity, strokeWidth) => {};
    startSupport = (configuration) => {};
    //This method adapted from code at http://stackoverflow.com/questions/5916900/detect-version-of-browser
    getBrowser = () => {};
    //This method adapted from code at http://stackoverflow.com/questions/5916900/detect-version-of-browser
    getBrowserVersion = () => {};
    isBrowserSupported = () => {};
    isVideoSupported = () => {};
    setLocale = (locale) => {};
    isZoomOpen = () => {};
    startZoom = () => {};
    endZoom = () => {};
};

class UC {
    modules = [];
    aed = new class {
        createTopic = (topicName, timeout) => {};
    };
    checkBrowserCompatibility = (checkBrowserCompatibilityCallback= (arg0, arg2) => {}) => {};
    csdkVersion = '';
    detectedUserAgent = '';
    detectedUserAgentVersion = '';
    onInitialised = () => {};
    onInitialisedFailed = () => {};
    start = (sessionId, stunServers) => {};
    phone = new class {
        onIncomingCall = (newCall) => {};
        setPreviewElement = (html) => {};
        setPreferredVideoFrameRate = (rate) => {};
        preferredCaptureFrameRate = null;
        onLocalMediaStream = (localMediaStream) => {};
        createCall = (callAgentName) => {};
        setPreferredVideoCaptureResolution = null;
        videoresolutions= {
            videoCaptureResolution176x144: null,
            videoCaptureResolution352x288: null,
            videoCaptureResolution320x240: null,
            videoCaptureResolution640x480: null,
            videoCaptureResolution1280x720: null,
            videoCaptureResolution1920x1080: null,
        };
        getCall = (callID) => {};
        getCalls = () => {};
        getPreferredAudioInputId = () => {};
        getPreferredAudioOutputId = () => {};
        getPreferredCaptureFrameRate = () => {};
        getPreferredCaptureResolution = () => {};
        getPreferredVideoInputId = () => {};
        initialisationSucessful = (initialisationSuccessJson) => {};
        setOnGetMediaDevices = (success) => {};
        setPreferredAudioInputId = (id) => {};
        setPreferredVideoFrameRate = (preferredFrameRate) => {};
        setPreferredVideoInputId = (id) => {};
        setPreviewElement = (element) => {};
    };
    supportedBrowserVersions= {
        chrome: '',
        edge: '',
        firefox: '',
        ie: '',
        opera: '',
        safari: '',
    };
}

export default {
    CafexCallManager: new CallManager() ,
    CafexCallManagerConfig: new CallManagerConfig(),
    CafexErrorDto ,
    CafexConnector: new Connector() ,
    AssistAgentSDK: new AssistAgent(),
    UC: new UC(),
}
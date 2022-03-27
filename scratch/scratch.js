function scratch(id, option){
    const me = this;
    var opt = $.extend({
        percent:50,
        canvasImageSrc:"",
        brushSrc:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFDElEQVRYR9WYfcifYxTHP0tKKymRpkWWRKRMViylbV6alpKx5KVJNAnLS9NiQ6KxjEQk8pL31NKWsUmJlYWSRRKRaJFaSmopfZ6u6+k8Z9f9u+/f8yhz/vrd931d53eu8/I933PNYvpyNLAUOBk4FjgROKio+xv4GvgJ+ALYCvw8nb+aNeamw4CrgXOBE8bc+w3wHvA8sHfo3qEGzi6GXQf4eybyJ/B0MdTfI2WIgecDdwNH9Ckb8/tvwL3AtlH7RhloPq0BrhqhYE8Jm+H7PeSZ+Xl4SQPT4agROl4AHgTM2/2ky8BDgEeARY09KnodeAPYPdBrFtJy4NJQSHHr+8Bq4K+sr2Wgnnu8wziT/CHgh4GG5WVW++2lyPI3jbwxe7Jl4NpGWPcB9wGvjTDMkM4p338pIe9afhlwF3BwWmC474/vsoHimqGNIiR4sk/Se5UvK1h4BmBaRDFcuwoGvg14yCgLSqSEriiGWtyckGigCw1h3KDSaxrGmfiGypANEVPC1FB/NvLZ5Ekdov4JrIwG6vIrkgLhJYZVr60HLhliVWPNm2V/9Ka6poQVeKmk1KSBwsCOdBLx6abwJxr3FLCwwzgruhZPbn1xy0fA9SnkD5d0qes8wGJgT/XgLcCqoMUFF6Zq9ZTZc2LfYyVncvsyVcxpD2kBRdGTFmMVHfRuyuMngU0aKKxsBwTXKq+UUNTnVvF8WLDrj55w2xo9xNlp3ZRiKAbHpiC5WKKBpxbQjfsvAL4vLwztllQQGmeYmujfMFgnmB7RSNPBKNV8PA54J+1droESgFvDB9uW8FHlYuCB8GwP9QDRc5VMeFhFiiVriWTg0GJA7Ol3Am8F3cJRZEkbNVDcM4RVniu9sT578nPCdwHbKqtyOmCSxxTxm1zwDuDTsFaUEC2qfFAiUZ/t/SvD960aaPiODy9Vurk8G5rPQvIa0jMDn9MbhkXvtGQKphWM3Rn6sWA+P6TKRcCGoOhbDbRDRHC+MgCzcGF1VRFKDHmVXP0tIzcW/le/STJqKvhOONHbit3lxaBkrwZ+mfDP/DMPldOAV8OGjI12gS5c7AqjFS3HrLIC+Lw8mH/mYZV9/wsD/+sQnxcaQjPEMykSO4D7u4pEKNIAO45iro9dJDknMsw8kwA2w4ynForyMCUGCuaRpmWYsS/LlqpkmNk2BKgz23AOsQNEoBZupPRSe8Vqt1oF9Sp6WW/H+cR+bF+u0gTqXKku7mt1AuwNY7a6JxLgD2l1K4aSBaHHbhHFfixT6Zttu8jCbQlS8qgxSRb80wOBbtmRYh473E/0YqVFWJ0LpERVhhDW78rieemuJnp+WoRVBS3Kn5NYI70NiO0uRX7ko8zFMSJS/syWVLAf5fdl19DkZVFkJK6V/ZgW4wxNm+K0Vo4hE5KWxfGzc2iqf5zHTkH25hFjpxPYWR1j58dlkusaOx9tjAOdY2eNTSvUhsTQRHKZY2keVzIq/omXXWJYTZU8uE+Gtm4c9+pDNiN9msnVh+w9splqy+CrDzd4S6D7I5OuivSm6P9yoGV9hSKNurxMhdlr7hX4TaNBl0f1z2TT6wDvUbpEMNWrDli/hrAa7iMBByG9lceBqM+LgXvGvX6LCg7YC8xopAjvMHPtv3QFLEOSNfW1ySl3M3155HdvCKRMejUOWkP2mga2M6/YKj/s3TfkjrpLydwC2KcAxwAnpYVfAT+Wmce2WQejXqPign8A0W1IMJkaf4EAAAAASUVORK5CYII=",
        init:function(){},
        end:function(){}
    },option);

    const $wrapper = $(id);
    const $canvas = $(id).find(".scratch__canvas");
    const canvas = $(id).find(".scratch__canvas")[0];
    const $result = $(id).find(".scratch__result");
    const context = canvas.getContext("2d");

    const canvasWidth = $wrapper[0].clientWidth;
    const canvasHeight = $wrapper[0].clientHeight;

    var isScratching = false; //스크래치 가능여부
    var brushImage = new Image();
    var canvasImage = new Image();
    var isBruchImageLoad = false; 


    function scratchMove(x,y){
        var x=x;
        var y=y;

        if(isBruchImageLoad){
            // console.log(Math.round(brushImage.width /2) , Math.round(brushImage.height/2));
            context.drawImage(brushImage,x-Math.round(brushImage.width /2),y-Math.round(brushImage.height/2));
        }
    }

    // 마우스 포지션값 
    function getMousePosition(e,canvas){
        var x,y;
        var rect = canvas.getBoundingClientRect();

        console.log(e.originalEvent.changedTouches) 
        var event = typeof e.originalEvent.changedTouches !="undefined" ? e.originalEvent.changedTouches[0]: e.originalEvent;
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;

        return {x:x, y:y}
    }

    function drawCanvas(){
        console.log("drawCanvas()");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        brushImage.src = opt.brushSrc;

        brushImage.onload=function(){
            isBruchImageLoad = true;
        }
        
        if(opt.canvasImageSrc.length>0){
            canvasImage.src = opt.canvasImageSrc;
            canvasImage.onload=function(){
                $result.css({"width":canvasWidth, "height":canvasHeight});
                context.drawImage(canvasImage,0,0,canvasWidth,canvasHeight);
            }
        }else{
            console.log("test");
            context.fillStyle = "#666666";
            context.fillRect(0,0,canvasWidth,canvasHeight);
        }
    }

    var currentPos, lastPos;
    function drawStart(e,canvas){
        me.isScratching = true;
        currentPos = getMousePosition(e,canvas);
    };

    function drawMove(e,canvas){
        if(!me.isScratching){
            return;
        }else{
            e.preventDefault();
            lastPos = getMousePosition(e,canvas);
            context.globalCompositeOperation = "destination-out";
            scratchMove(lastPos.x,lastPos.y);
        }
    }

    function drawStop(e,canvas){
        me.isScratching = false;
    }


    function init(){
        drawCanvas();
        $canvas.on('mousedown touchstart',function(e){drawStart(e,canvas)});
        $canvas.on('mousemove touchmove',function(e){drawMove(e,canvas)});
        $canvas.on('mouseup touchend',function(e){drawStop(e,canvas)});
    }

    init();
}
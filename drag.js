
import store from '../store/index';

export default {
    drag: {
        store,
        bind:function (el,binding,vnode) {
            const rightHandle=$(el).children('.drag-bar__right-handle')[0];
            const leftHandle=$(el).children('.drag-bar__left-handle')[0];
            const bg=$(el).children('.drag-bar__bg')[0];
            let minLeft,maxRight;
            //↓计算拖拽条left最小值和right最大值↙
            //（在新增拖拽条时会依靠这个函数计算出left最小值）
            CalLimitvalue()

            //以dom拖拽条宽度来做拖拽条宽度的标准
            /*
            * 会导致 根据vuex响应dom 失败
            * 进而导致 获取dom数据再反馈给vuex 出现错误
            * */
            let thisDragBarWidth=$(el).width(),
                maxLeft=maxRight-thisDragBarWidth
            //正确获取拖拽条的宽度
            //（有vuex就从vuex获取，没有就从dom获取）


            //这个括号内的内容是state数据dragBar在当前拖拽条上的left值
            //（在新增拖拽条时）
            EntireDragBarPutRight(store.state.dragBar[binding.value].left)
            VuexLeftRightFromDom()

            leftHandle.onmousedown = function (e) {
                CalLimitvalue()
                let oldClientX = e.clientX
                const disX = e.clientX - el.offsetLeft;
                const styleWidth=parseFloat($(el).css('width'))
                const right=store.state.dragBar[binding.value].right
                document.onmousemove = function (e) {
                    //e.clientX是鼠标x坐标
                    //el.offsetLeft是el左边x坐标
                    let l = e.clientX - disX;
                    let bodyW = styleWidth+oldClientX-e.clientX;
                    let bgW=bodyW-20;
                    if(l<=minLeft){//左侧碰撞暂停、溢出回弹
                        el.style.left=minLeft+'px'
                        el.style.width=right-minLeft+'px'
                        $(el).children('.drag-bar__bg').css('width',right-minLeft-10 +'px');
                    }else if(l>=right){//右侧碰撞暂停、溢出回弹
                        el.style.left=right+'px'
                        el.style.width=0+'px'
                        $(el).children('.drag-bar__bg').css('width',0 +'px');
                    }else {//无碰撞、溢出情况
                        el.style.left=l+'px'
                        el.style.width=bodyW+'px'
                        $(el).children('.drag-bar__bg').css('width',bgW+'px');
                    }
                    VuexLeftRightFromDom()
                }
                document.onmouseup = function (e) {//用函数封装无效
                    CalLeftRightMouseup()
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }

            rightHandle.onmousedown = function (e) {
                CalLimitvalue()
                let oldClientX = e.clientX
                const styleWidth=parseFloat($(el).css('width'))
                const maxWidth=maxRight-store.state.dragBar[binding.value].left
                document.onmousemove = function (e) {
                    //e.clientX是鼠标x坐标
                    //el.offsetLeft是el左边x坐标
                    let bodyW = styleWidth+e.clientX - oldClientX
                    let bgW=bodyW-20;
                    el.style.width= bodyW>=maxWidth ? maxWidth+'px' : bodyW+'px';
                    if(bodyW>=maxWidth){
                        el.style.width= maxWidth+'px'
                        $(el).children('.drag-bar__bg').css('width',maxWidth-20+'px');
                    }else {
                        el.style.width= bodyW+'px';
                        $(el).children('.drag-bar__bg').css('width',bgW+'px');
                    }
                    VuexLeftRightFromDom()
                }
                document.onmouseup = function (e) {
                    CalLeftRightMouseup()
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }

            bg.onmousedown = function (e) {
                CalLimitvalue()
                const disX = e.clientX - el.offsetLeft;
                thisDragBarWidth=store.state.dragBar[binding.value].right-store.state.dragBar[binding.value].left
                maxLeft=maxRight-thisDragBarWidth
                document.onmousemove = function (e) {
                    let l = e.clientX - disX;
                    EntireDragBarPutRight(l)
                    VuexLeftRightFromDom()
                };
                document.onmouseup = function (e) {
                    CalLeftRightMouseup()
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };

            //根据dom获取的left、width计算后实时同步vuex中的left、right
            function VuexLeftRightFromDom(){
                let left=parseFloat($(el).css('left'))
                let right=left+parseFloat($(el).css('width'))
                store.state.dragBar[binding.value].left=left
                store.state.dragBar[binding.value].right=right
            }

            //在抬起鼠标后根据dom获取的left、right来同步vuex中的left、right
            function CalLeftRightMouseup(){
                let left=parseFloat($(el).css('left'))
                let right=left+parseFloat($(el).css('width'))
                let payloadLeft={}
                let payloadRight={}
                payloadLeft.index=binding.value
                payloadLeft.attr='left'
                payloadLeft.value=left
                payloadRight.index=binding.value
                payloadRight.attr='right'
                payloadRight.value=right
                store.commit('SetDragbarSubkeyAttr',payloadLeft)
                store.commit('SetDragbarSubkeyAttr',payloadRight)
            }

            //计算最小left以及最大right
            function CalLimitvalue() {
                minLeft=0;maxRight=777;

                for (let i=binding.value;i>=0;i--){
                    if(!store.state.dragBar[i-1]){
                        break
                    }else if(store.state.dragBar[i-1].show===true){
                        minLeft=store.state.dragBar[i-1].right
                        break
                    }
                }

                for (let i=binding.value;i<=store.state.dragBar.length-1;i++){
                    if(!store.state.dragBar[i+1]){
                        break
                    }else if(store.state.dragBar[i+1].show===true){
                        maxRight=store.state.dragBar[i+1].left
                        break
                    }
                }

            }

            //根据左端点判断拖拽条放入情况
            //并根据判断结果操作拖拽条dom的左端位置
            function EntireDragBarPutRight(l) {
                el.style.left=(function(){
                    switch (true){
                        case minLeft>maxLeft:
                            alert('没有空间放置该拖拽条,即将进行删除')
                            document.onmousemove = null;
                            store.state.dragBar[binding.value].show=false//【】
                            break
                        case l<=minLeft:
                            return minLeft+'px'
                        case minLeft<l&&l<maxLeft:
                            return l+'px'
                        case maxLeft<=l:
                            return maxLeft+'px'
                        default:
                            console.error('Something go wrong when you put DragBar in. (from fn EntireDragBarPutRight)');
                    }
                }())
            }

        }
    }
}
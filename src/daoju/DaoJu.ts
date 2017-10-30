abstract class DaoJu extends egret.Sprite{
    abstract pz(sceneBox:egret.Sprite):void ;
    abstract key: string;
    abstract texture: string;
    
    protected createBitmap(resKey: string, isACenter: boolean = false): egret.Bitmap {
        let bmp: egret.Bitmap = new egret.Bitmap(RES.getRes(resKey));
        if (isACenter) {
            bmp.anchorOffsetX = bmp.width / 2;
            bmp.anchorOffsetY = bmp.height / 2;
        }
        return bmp;
    }
}
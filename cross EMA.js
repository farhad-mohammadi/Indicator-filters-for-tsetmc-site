//https://github.com/farhad-mohammadi/Indicator-filters-for-tsetmc-site
//telegram : @farhad_m60
true==function()
{
    if ( [ih][0].PriceMax!= (pmax) || [ih][0].PDrCotVal != (pl) || [ih][0].QTotTran5J != (tvol) )
    {
        if ( typeof [ih][1].fixed == "undefined")
        {
            [ih].unshift(Object.assign({}, [ih][0]));
            [ih][1].fixed=true;
        }
        [ih][0].PriceFirst=(pf);
        [ih][0].PClosing=(pc);
        [ih][0].PDrCotVal=(pl);
        [ih][0].ZTotTran=(tno);
        [ih][0].QTotTran5J=(tvol);
        [ih][0].QTotCap=(tval);
        [ih][0].PriceChange=(pcc);
        [ih][0].PriceMin=(pmin);
        [ih][0].PriceMax=(pmax);
        [ih][0].PriceYesterday=(py);
    }
    function clear(data)
    {
        if ( data.PriceMax!=0 || data.PriceMin!=0) return data;
    }
    
    if ( typeof [ih][1].history=="undefined")
    {
        [ih]=[ih].filter(clear);
        [ih][1].history=true;
    }

    function EMA(period)
    {
        let ema_array = Array();
        let len=[ih].length-1;
        let multiplier= 2/(1+period);
        if ( len<=period+5) return;
        let sum=0;
        for(let i=len; i>len-period; i--)
        {
            sum+=[ih][i].PDrCotVal;
        }
        let j=len-period+1;
        let temp = Math.round(sum/period*10)/10;
        ema_array.unshift(temp);
        j--;
        while(j>=0)
        {
            temp = Math.round( 10*((([ih][j].PDrCotVal-ema_array[0])*multiplier)+ema_array[0]))/10;
            ema_array.unshift( temp);
            j--;
        }
        return ema_array;
    }
    let ema21 = EMA(21);
    let ema9 = EMA(9);
    if (ema9[1]<ema21[1]  && ema9[0]>ema21[0]  && [ih][0].PDrCotVal>ema21[0])
    {
        (cfield0)="EMA 21 = "+String(ema21[0]);
        (cfield1)="EMA 9 = "+String(ema9[0]);
        return true;
    }
}()
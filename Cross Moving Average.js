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

    function SMA(period)
    {
        let sma_array = Array();
        let len=[ih].length-1;
        if ( len<period) return;
        for ( let i=0 ; i<len-period ;  i++)
        {
            let sum = 0 ;
            for ( let j=i ; j<i+period ; j++)
            {
                sum += [ih][j].PDrCotVal;
            }
            sma_array[i] = Math.round( 10 * sum / period) /10 ;
        }
        return sma_array;
    }
    let sma21 = SMA(21);
    let sma9 = SMA(9);
    if (sma9[1]<sma21[1] && sma9[0]>sma21[0] && [ih][0].PDrCotVal>sma21[0])
    {
        (cfield0)="SMA 21 = "+String(sma21[0]);
        (cfield1)="SMA 9 = "+String(sma9[0]);
        return true;
    }
}()
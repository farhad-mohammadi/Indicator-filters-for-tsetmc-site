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
    function RSI(period)
    {
        let len = [ih].length-1;
        let gain = Array();
        let loss = Array();
        for ( let i=0 ; i<len; i++)
        {
            if ([ih][i].PDrCotVal >= [ih][i+1].PDrCotVal )
            {
                gain[i] = [ih][i].PDrCotVal - [ih][i+1].PDrCotVal;
                loss[i] = 0;
            }
            else
            {
                gain[i] = 0;
                loss[i] = [ih][i+1].PDrCotVal - [ih][i].PDrCotVal;
            }
        }
        let sum_gain = 0;
        let sum_loss = 0;
        for ( let i=len-period; i<len;i++)
        {
            sum_gain += gain[i];
            sum_loss += loss[i];
        }
        let average_gain = Array();
        let average_loss = Array();
        average_gain[len-period] = sum_gain / period;
        average_loss[len-period] = sum_loss / period;
        for ( let i=len-period-1 ; i>=0 ; i--)
        {
            average_gain[i] = ( (period-1) * average_gain[i+1] + gain[i] ) / period;
            average_loss[i] = ( (period-1) * average_loss[i+1] + loss[i] ) / period;
        }
        
        for ( let i=len-period ; i>=0; i--)
        {
            let rsi = 100 - (100 /   ( 1 + ( average_gain[i] / average_loss[i] )));
            [ih][i].rsi  = Math.round(rsi *100 )/ 100;
        }
    }
    RSI(14);
    if ( (l18)=='فولاد')
    {
        (cfield0)=[ih][0].rsi;
        (cfield1)=[ih][1].rsi;
        return true;
    }
}()
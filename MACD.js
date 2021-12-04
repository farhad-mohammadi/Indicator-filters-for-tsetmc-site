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

    function ema(period)
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
        let j=len-period;
        let temp = Math.round(sum/period*10)/10;
        ema_array.unshift(temp);
        while(j>=0)
        {
            temp = Math.round( 10*((([ih][j].PDrCotVal-ema_array[0])*multiplier)+ema_array[0]))/10;
            ema_array.unshift( temp);
            j--;
        }
        return ema_array;
    }

    function MACD_classic(fast_period, slo_period, signal_period)
    {
        let fast_array = ema(fast_period);
        let slow_array = ema(slo_period);
        let len =  slow_array.length;
        for ( let i=0 ; i< len ; i++)
        {
            [ih][i].macd = Math.round( (fast_array[i] - slow_array[i]) *100 ) /100 ;
        }
        for ( let i =0 ; i<len ; i++)
        {
            let sum = 0;
            for (let j=i; j<i+signal_period ; j++ )
            {
                sum += [ih][j].macd;
            }
        [ih][i].signal = Math.round( sum /signal_period *100 ) / 100;
        }
        len -= signal_period;
        for ( let i=0 ; i<len ; i++)
        {
            [ih][i].histogram = Math.round( ([ih][i].macd - [ih][i].signal) * 100 ) / 100;
        }
    }
   MACD_classic(12,26,9); 
    if ([ih][1].histogram<-5 && [ih][0].histogram>5)
    {
        (cfield0)="<h4>در نماد "+(l18)+" histogram از منفی به مثبت تبدیل شده است .</h4>";
        (cfield1)=[ih][0].macd;
        (cfield2)=[ih][0].histogram;
        return true;
    }
}()
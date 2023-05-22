export function csvParser(csvText) {
    let p = '',
      row = [''],
      ret = [row],
      i = 0,
      r = 0,
      s = true,
      l;
    for (l of csvText) {
      if ('"' === l) {
        if (s && l === p) row[i] += l;
        s = !s;
      } else if (',' === l && s) l = row[++i] = '';
      else if ('\n' === l && s) {
        if ('\r' === p) row[i] = row[i].slice(0, -1);
        row = ret[++r] = [l = ''];
        i = 0;
      } else row[i] += l;
      p = l;
    }
    
    const headers = ret[0];
    const result = [];
    
    for (let j = 1; j < ret.length; j++) {
      const currentRow = ret[j];
      const obj = {};
      for (let k = 0; k < headers.length; k++) {
        const key = headers[k];
        const value = currentRow[k];
        obj[key] = value;
      }
      result.push(obj);
    }
  
    return result;
  }
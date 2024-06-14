function dataURLtoFile(dataurl:any, filename:any) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    let file = new File([u8arr], filename, {type:mime});
    let formData = new FormData();
    formData.append("file", file)

    const metadata = JSON.stringify({
      keyvalues: {
        test: "test",
      },
    });
    formData.append("pinataMetadata", metadata)

    return formData
}

export default dataURLtoFile;
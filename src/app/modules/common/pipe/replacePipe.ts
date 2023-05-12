import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'replace'
})
export class ReplacePipe implements PipeTransform{
    

    transform(value: string, strToReplace: string, replecmentStr: string){
        if(!value || !strToReplace || !replecmentStr){
            return value;
        }
        return value.replace(new RegExp(strToReplace, 'g'), replecmentStr);
    }
    
}
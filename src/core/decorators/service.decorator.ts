import 'reflect-metadata';

export default function Service(): ClassDecorator {
    return function(target) {
        console.log(Reflect.getMetadata('design:paramtypes', target));
    }
}

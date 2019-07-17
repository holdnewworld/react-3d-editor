import React, { Component } from 'react';
import { Entity } from 'aframe';
import { Collapse } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import FormRender from './FormRender';

interface IProps extends FormComponentProps {
    entity?: Entity;
}

export type GeneralComponentType = 'position'
| 'rotation'
| 'scale'
| 'visible'
| 'name'
;

export const generalComponents: GeneralComponentType[] = ['name', 'position', 'rotation', 'scale', 'visible'];

class GeneralComponent extends Component<IProps> {
    render() {
        const { entity, form } = this.props;
        return (
            <Collapse bordered={false} defaultActiveKey={['general']}>
                <Collapse.Panel key={'general'} header={'General'}>
                    {
                        generalComponents.map((componentName: GeneralComponentType) => {
                            const { schema } = AFRAME.components[componentName] as any;
                            let data = entity.object3D[componentName] as any;
                            if (componentName === 'rotation') {
                                data = {
                                    x: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.x),
                                    y: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.y),
                                    z: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.z),
                                };
                            }
                            return (
                                <FormRender
                                    key={componentName}
                                    entity={entity}
                                    data={data}
                                    componentName={componentName}
                                    schema={schema}
                                    form={form}
                                />
                            )
                        })
                    }
                </Collapse.Panel>
            </Collapse>
        );
    }
}

export default GeneralComponent;

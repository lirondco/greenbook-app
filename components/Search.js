import React, { useState } from 'react';
import { useStateValue } from "../components/State";
import { Text, StyleSheet, Button, View, TextInput, TouchableOpacity } from 'react-native';
import { getStyles, Theme } from '../utils';
import { FontAwesome } from '@expo/vector-icons'; 
export default function Search(props) {

    const [{ view, isWeb, dimensions, searchConfig }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_body', {isWeb}));


    function SearchForm() {

        const [ query, setQuery ] = useState(searchConfig.q || '');
        const [ near, setNear ] = useState(searchConfig.near || '');

        const small = dimensions.window.width < 900 || props.mode === 'results';

        return (
            <View style={{flex: 1, borderWidth: props.mode === 'results' ? 1 : 0, borderColor: Theme.green, backgroundColor: '#fff', borderRadius: 40, maxWidth: 840, paddingLeft: 40, paddingRight: 20, paddingTop: 6, paddingBottom: 6}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex: 1, width: small ? 100 : 200}}>
                        {!small && 
                            <View>
                                <Text style={[styles.text_body, {fontSize: 16, color: '#000', fontWeight: 'bold'}]}>Cuisine</Text>
                            </View>
                        }
                        <View>
                            <TextInput name="q" value={query} style={[styles.text_body, { height: 30, fontSize: 16 }]} placeholder={small ? 'Cuisine' : "BBQ, Mexican, Seafood, etc."} onChangeText={text => setQuery(text)} />
                        </View>
                    </View>
                    <View style={{width:1, borderRightWidth: 1, height: 48, borderColor: 'rgba(0, 0, 0, 0.5)', marginLeft: 20, marginRight: 20}} />
                    <View style={{flex: 1, width: small ? 100 : 440}}>
                        {!small && 
                            <View>
                                <Text style={[styles.text_body, {fontSize: 16, color: '#000', fontWeight: 'bold'}]}>Location</Text>
                            </View>
                        }
                        <View>
                            <TextInput name="near" value={near} style={[styles.text_body, { height: 30, fontSize: 16 }]} placeholder={small ? 'Location' : "Address, city, zip, state or neighborhood"} onChangeText={text => setNear(text)} />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={(e) => {
                            if (!isWeb) {
                                dispatch({type: 'searchConfig', value: {
                                    q: query,
                                    near: near
                                }})
                                dispatch({type: 'setView', view: '/search'})
                            } else {
                                let go = '/search';
                                if (query || near) {
                                    let nc = '?';
                                    if (query) {
                                        go += nc + 'q=' + encodeURIComponent(query)
                                        nc = '&'
                                    }
                                    if (near) {
                                        go += nc + 'near=' + encodeURIComponent(near)
                                    }
                                }
                                window.location = go;
                            }
                        }}>
                            {small ? (
                                <View style={{backgroundColor: Theme.green_bg, borderRadius: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10}}>
                                    <FontAwesome name="search" size={24} color="#fff" />
                                </View>
                            ) : (
                                <View style={{backgroundColor: '#E5E5E5', borderRadius: 40, height: 55, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20}}>
                                    <FontAwesome name="search" size={24} color="black" />
                                    <Text style={[styles.text_body, { fontSize: 16, color: '#000', marginLeft: 10}]}>Search</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {isWeb ? (
                <form method="GET" action="/search"><SearchForm /></form>
            ) : <SearchForm />
            }
        </View>
    )

}

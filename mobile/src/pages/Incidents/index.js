import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

import { formatted } from '../../utils/format';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
  const navigation = useNavigation();

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  async function loadIncidents() {
    if (loading) return;

    if (total > 0 && incidents.length === total) return;

    setLoading(true);

    const response = await api.get('/incidents', {
      params: { page },
    });

    const data = response.data.map(i => ({ ...i, priceFormatted: formatted(i.value)}));

    setIncidents([...incidents, ...data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
    setRefreshing(false);
    };

  useEffect(() => {
    loadIncidents();
  }, [incidents]);

  function handleNavigateToDetail(incident) {
    navigation.push('Detail', { incident });
  };

  async function handleRefreshList() {
    setRefreshing(true);
    setPage(1);
    setIncidents([]);

    loadIncidents();
  }

  function renderFooter() {
    if (loading) return null;

    return (
      <ActivityIndicator
        animating
        size="small"
        color="#e02041"
      />
     );
   };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}> {total} Casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve uma vinda.</Text>

      <FlatList
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={["#e02041"]}
            refreshing={refreshing}
            onRefresh={handleRefreshList}
        />}
        ListFooterComponent={renderFooter}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <View style={styles.incidentList}>
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG: </Text>
          <Text style={styles.incidentValue}>{item.name}</Text>

          <Text style={styles.incidentProperty}>CASO: </Text>
          <Text style={styles.incidentValue}>{item.title}</Text>

          <Text style={styles.incidentProperty}>VALOR: </Text>
        <Text style={styles.incidentValue}>{item.priceFormatted}</Text>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => handleNavigateToDetail(item)}
          >
            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#e02041" />
          </TouchableOpacity>
        </View>
      </View>
        )}
      />
    </View>
  );
}
